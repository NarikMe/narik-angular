import {
  EventAggregatorService,
  EventInfo,
  MetaDataService,
  MetaData,
} from '@narik/infrastructure';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { pluck, share } from 'rxjs/operators';

import { Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NarikEventAggregatorService extends EventAggregatorService {
  private eventsInfo = new Map<string, EventInfo>();
  private subjects = new Map<string, Subject<any>>();

  constructor(@Optional() private metadataService: MetaDataService) {
    super();

    if (this.metadataService) {
      const metaDataItems = this.metadataService.getAllMetaData().valuesArray();
      for (const metaData of metaDataItems) {
        this.addMetaDataEvents(metaData);
      }
      this.metadataService.metaDataAdded.subscribe((x) => {
        this.addMetaDataEvents(x.metaData);
      });
    }
  }

  private addMetaDataEvents(metaData: MetaData) {
    if (metaData['events']) {
      for (const event of metaData['events'].valuesArray()) {
        this.eventsInfo.set(event.key, event);
      }
    }
  }
  getSubject(eventType: string): Subject<any> {
    let subject = this.subjects.get(eventType);
    if (!subject) {
      subject = this.createSubject(this.eventsInfo.get(eventType));
      this.subjects.set(eventType, subject);
    }
    return subject;
  }
  createSubject(eventInfo: EventInfo): Subject<any> {
    if (!eventInfo || !eventInfo.info) {
      return new Subject<any>();
    } else {
      if (eventInfo.info.subjectType === 'ReplaySubject') {
        return new ReplaySubject(eventInfo.info.subjectParam || 1);
      } else if (eventInfo.info.subjectType === 'ReplaySubject') {
        return new BehaviorSubject(eventInfo.info.subjectParam);
      }
    }
    return new Subject<any>();
  }
  publish(eventType: any, eventArgs: any) {
    const subject = this.getSubject(eventType);
    subject.next({
      eventType: eventType,
      eventArgs: eventArgs,
    });
  }
  listen<T>(eventType: any): Observable<T> {
    const subject = this.getSubject(eventType);
    return subject.pipe(
      filter((x) => x.eventType === eventType),
      pluck<any, T>('eventArgs'),
      share()
    );
  }
}

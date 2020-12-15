import { Input, OnInit, Injector } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { NarikDataDisplayValueComponent } from '../base/narik-data-display-value-component';
import {
  CommandInfo,
  CommandHost,
  CommandProcessor,
  DialogRef,
  NavigationService,
} from '@narik/infrastructure';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';
import { NarikInject } from '@narik/core';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export class NarikSelect
  extends NarikDataDisplayValueComponent
  implements ControlValueAccessor, OnInit, CommandHost {
  private changeSubject = new ReplaySubject(1);

  defaultNavigationProvider = 'route';

  change$: Observable<any>;

  @NarikInject(CommandProcessor)
  commandProcessor: CommandProcessor;

  @NarikInject(NavigationService)
  navigationService: NavigationService;

  @NarikInject(ActivatedRoute)
  route: ActivatedRoute;

  get uiKey(): string {
    return 'select';
  }

  _multiple: boolean;

  @Input()
  set multiple(value: boolean) {
    this._multiple = value;
  }
  get multiple(): boolean {
    return this._multiple;
  }

  _dataIsLoading: boolean;
  set dataIsLoading(value: boolean) {
    if (value !== this._dataIsLoading) {
      this.detectChanges();
    }
    this._dataIsLoading = value;
  }
  get dataIsLoading(): boolean {
    return this._dataIsLoading;
  }

  constructor(injector: Injector) {
    super(injector);
    this.change$ = this.changeSubject.asObservable();
  }
  protected useData(data: any[]) {
    throw new Error('Subclass Must Override useData.');
  }

  protected detectChanges() {
    this.changeSubject.next();
  }

  processCommand(cmd: CommandInfo) {
    if (cmd.commandKey === 'refresh') {
      this.reLoadData();
    } else if (cmd.commandKey === 'list') {
      this.showList();
    } else if (cmd.commandKey === 'new') {
      this.newOrEditEntity();
    } else if (cmd.commandKey === 'edit') {
      this.newOrEditEntity(this.value);
    } else {
      this.commandProcessor.processCommand(this, cmd);
    }
  }

  protected valueChanged(newValue: any, oldValue: any): void {
    super.valueChanged(newValue, oldValue);
    this.detectChanges();
  }

  ngOnInit() {
    super.ngOnInit();
  }
  protected showList() {
    const data = {};
    data['__dialogTitle'] = 'list_' + (this.dataKey || this.dataInfo.dataKey);
    this.navigationService
      .navigate(
        this.navigationService.createNavigationCommand(
          this.defaultNavigationProvider,
          (this.dataKey || this.dataInfo.dataKey) + '-list'
        ),
        'dialog',
        {
          relativeTo: this.route,
        },
        data
      )
      .then((d: DialogRef<any>) => {});
  }
  protected newOrEditEntity(value?: any) {
    const data = value
      ? {
          entityId: value,
        }
      : {};
    data['__dialogTitle'] = this.dataKey || this.dataInfo.dataKey;
    this.navigationService
      .navigate(
        this.navigationService.createNavigationCommand(
          this.defaultNavigationProvider,
          this.dataKey || this.dataInfo.dataKey
        ),
        'dialog',
        {
          relativeTo: this.route,
        },
        data
      )
      .then((d: DialogRef<any>) => {
        d.events
          .pipe(filter((x) => x.eventType === 'ENTITY_UPDATED'))
          .subscribe((x) => {
            this.reLoadData();
          });
      });
  }
}

export const NARIK_SELECT_INPUTS: string[] = ['multiple'];

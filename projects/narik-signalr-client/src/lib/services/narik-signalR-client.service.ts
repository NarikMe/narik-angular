import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { filter } from "rxjs/internal/operators/filter";
import { pluck } from "rxjs/internal/operators/pluck";
import { share } from "rxjs/internal/operators/share";

import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState
} from "@aspnet/signalr";
import { Injectable, Inject } from "@angular/core";
import { SIGNALR_CONFIG } from "../internal-injectionTokens";
import { NarikSignalRConfig } from "../base/narik-signalR.config";
import { RemoteMessagingService } from "narik-infrastructure";

@Injectable()
export class NarikSignalRMessagingService extends RemoteMessagingService {
  private messagingSubject = new Subject<any>();
  connectionEstablished = new Subject<Boolean>();
  private hubConnection: HubConnection;
  private connecting = false;

  constructor(@Inject(SIGNALR_CONFIG) private config: NarikSignalRConfig) {
    super();
    this.createConnection();
    this.registerOnServerEvents();
  }

  listen<T>(messageType: any): Observable<T> {
    return this.messagingSubject.pipe(
      filter(x => x.messageType === messageType),
      pluck<any, T>("messageData"),
      share()
    );
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.config.url)
      .build();
  }

  private startConnection(): Promise<any> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (
          !this.connecting &&
          this.hubConnection.state === HubConnectionState.Disconnected
        ) {
          this.connecting = true;
          this.hubConnection.start().then(
            () => {
              this.connecting = false;
              this.connectionEstablished.next(true);
              res(true);
            },
            () => {
              this.connecting = false;
            }
          );
        } else {
          res(true);
        }
      }, this.config.WitUntilServerIsReady || 2000);
    });
  }

  private registerOnServerEvents(): void {
    for (const message of this.config.messageKeys) {
      this.hubConnection.on(message, (data: any) => {
        this.messagingSubject.next({
          messageData: data,
          messageType: message
        });
      });
    }
  }

  connect(): Promise<any> {
    return this.startConnection();
  }
  disConnect(): Promise<any> {
    return this.hubConnection.stop();
  }
}

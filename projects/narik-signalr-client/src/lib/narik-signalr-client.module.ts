import { NgModule, ModuleWithProviders } from "@angular/core";
import { NarikSignalRConfig } from "./base/narik-signalR.config";
import { SIGNALR_CONFIG } from "./internal-injectionTokens";
import { NarikSignalRMessagingService } from "./services/narik-signalR-client.service";
import { RemoteMessagingService } from "narik-infrastructure";

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: []
})
export class NarikSignalRClientModule {
  static forRoot(config: NarikSignalRConfig): ModuleWithProviders {
    return {
      ngModule: NarikSignalRClientModule,
      providers: [
        {
          provide: RemoteMessagingService,
          useClass: NarikSignalRMessagingService
        },
        {
          provide: SIGNALR_CONFIG,
          useValue: config
        }
      ]
    };
  }

  constructor(private signalRService: RemoteMessagingService) {}
}

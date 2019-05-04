import { Component, forwardRef, Input } from "@angular/core";
import { BusyIndicator } from "narik-app-core";

@Component({
  selector: "narik-dev-busy-indicator , narik-busy-indicator",
  templateUrl: "narik-dev-busy-indicator.component.html",
  styleUrls: ["narik-dev-busy-indicator.component.css"],
  providers: [
    {
      provide: BusyIndicator,
      useExisting: forwardRef(() => NarikDevBusyIndicator)
    }
  ]
})
export class NarikDevBusyIndicator
 implements BusyIndicator {
  busyMessage: string;

  @Input()
  isBusy: boolean;
  setBusy(newState: boolean, msg?: string) {
    this.isBusy = newState;
  }
}

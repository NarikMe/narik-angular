import { Component, forwardRef, Input } from "@angular/core";
import { BusyIndicator } from "narik-app-core";

@Component({
  selector: "narik-nb-busy-indicator , narik-busy-indicator",
  templateUrl: "narik-nb-busy-indicator.component.html",
  styleUrls: ["narik-nb-busy-indicator.component.css"],
  providers: [
    {
      provide: BusyIndicator,
      useExisting: forwardRef(() => NarikNebularBusyIndicator)
    }
  ]
})
export class NarikNebularBusyIndicator implements BusyIndicator {
  busyMessage: string;

  @Input()
  isBusy: boolean;

  @Input()
  spinnerStatus: string = "info";

  setBusy(newState: boolean, msg?: string) {
    this.isBusy = newState;
  }
}

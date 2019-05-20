import { Component, forwardRef, Input } from "@angular/core";
import { BusyIndicator } from "narik-app-core";

@Component({
  selector: "narik-swimlane-busy-indicator , narik-busy-indicator",
  templateUrl: "narik-swimlane-busy-indicator.component.html",
  styleUrls: ["narik-swimlane-busy-indicator.component.css"],
  providers: [
    {
      provide: BusyIndicator,
      useExisting: forwardRef(() => NarikSwimlaneBusyIndicator)
    }
  ]
})
export class NarikSwimlaneBusyIndicator
 implements BusyIndicator {
  busyMessage: string;

  @Input()
  isBusy: boolean;
  setBusy(newState: boolean, msg?: string) {
    this.isBusy = newState;
  }
}

import { NarikAutoComplete } from "@narik/ui-core";

import { Component, forwardRef, Injector, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS, NARIK_DATA_DISPLAY_VALUE_OUTPUTS } from "../input-output-items";

@Component({
  selector: "narik-swimlane-autocomplete  , narik-autocomplete ",
  templateUrl: "narik-swimlane-auto-complete.component.html",
  styleUrls: ["narik-swimlane-auto-complete.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikSwimlaneAutoComplete),
      multi: true
    }
  ]
})
export class NarikSwimlaneAutoComplete extends NarikAutoComplete
  implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  protected useData(data: any[]) {}
}

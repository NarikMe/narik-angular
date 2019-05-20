import {
  NARIK_DATA_DISPLAY_VALUE_INPUTS,
  NARIK_DATA_DISPLAY_VALUE_OUTPUTS,
  NarikAutoComplete
} from "narik-ui-core";

import { Component, forwardRef, Injector, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { tap } from "rxjs/internal/operators/tap";
import { finalize } from "rxjs/internal/operators/finalize";
import { of } from "rxjs/internal/observable/of";
import { DataProviderService, MODULE_DATA_KEY } from "narik-infrastructure";

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

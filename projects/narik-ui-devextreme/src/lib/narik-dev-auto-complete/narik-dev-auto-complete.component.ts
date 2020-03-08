import {
  NarikAutoComplete
} from "@narik/ui-core";
import { Observable } from "rxjs";
import { Subject } from "rxjs";

import {
  Component,
  forwardRef,
  Injector,
  OnInit,
  HostBinding
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS, NARIK_AUTOCOMPLETE_INPUTS, NARIK_DATA_DISPLAY_VALUE_OUTPUTS } from "../input-output-items";

@Component({
  selector: "narik-dev-autocomplete  , narik-autocomplete ",
  templateUrl: "narik-dev-auto-complete.component.html",
  styleUrls: ["narik-dev-auto-complete.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS, ...NARIK_AUTOCOMPLETE_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikDevAutoComplete),
      multi: true
    }
  ]
})
export class NarikDevAutoComplete extends NarikAutoComplete implements OnInit {
  filteredData: Observable<any[]>;
  optionData: any[] = [];
  textChanged = new Subject<string>();

  @HostBinding("class")
  class = "dx-field display-block";

  constructor(injector: Injector) {
    super(injector);
  }

  protected useData(data: any[]) {
    this.optionData = data;
  }

  ngOnInit() {
    this.loadDataOnInit = !this.isLazyLoadData;
    super.ngOnInit();
  }
}

import {
  Component,
  forwardRef,
  Injector,
  OnInit,
  HostBinding
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  NARIK_DATA_DISPLAY_VALUE_INPUTS,
  NARIK_SELECT_INPUTS,
  NARIK_DATA_DISPLAY_VALUE_OUTPUTS,
  NarikSelect
} from "narik-ui-core";

@Component({
  selector: "narik-prime-select , narik-select",
  templateUrl: "narik-prime-select.component.html",
  styleUrls: ["narik-prime-select.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS, ...NARIK_SELECT_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikPrimeSelect),
      multi: true
    }
  ]
})
export class NarikPrimeSelect extends NarikSelect implements OnInit {
  optionData: any[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  protected useData(data: any[]) {
    this.optionData = data;
  }
}

import {
  Component,
  forwardRef,
  Injector,
  OnInit,
  Input
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NarikSelect } from "narik-ui-core";
import {
  NARIK_DATA_DISPLAY_VALUE_INPUTS,
  NARIK_SELECT_INPUTS,
  NARIK_DATA_DISPLAY_VALUE_OUTPUTS
} from "../input-output-items";

@Component({
  selector: "narik-ngb-select , narik-select",
  templateUrl: "narik-ngb-select.component.html",
  styleUrls: ["narik-ngb-select.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS, ...NARIK_SELECT_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgbSelect),
      multi: true
    }
  ]
})
export class NarikNgbSelect extends NarikSelect implements OnInit {
  optionData: any[] = [];
  @Input()
  icon: any;

  constructor(injector: Injector) {
    super(injector);
  }

  protected useData(data: any[]) {
    this.optionData = data;
  }
}

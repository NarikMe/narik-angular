import {
  NARIK_DATA_DISPLAY_VALUE_INPUTS,
  NARIK_DATA_DISPLAY_VALUE_OUTPUTS,
  NarikAutoComplete
} from "narik-ui-core";


import {
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
  HostBinding
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "narik-ngb-autocomplete  , narik-autocomplete ",
  templateUrl: "narik-ngb-auto-complete.component.html",
  styleUrls: ["narik-ngb-auto-complete.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgbAutoComplete),
      multi: true
    }
  ]
})
export class NarikNgbAutoComplete extends NarikAutoComplete implements OnInit {}

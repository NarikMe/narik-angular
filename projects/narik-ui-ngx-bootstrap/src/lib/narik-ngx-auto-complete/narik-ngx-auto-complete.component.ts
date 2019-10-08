import { NarikAutoComplete } from "narik-ui-core";


import {
  Component,
  forwardRef,
  OnInit
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS, NARIK_DATA_DISPLAY_VALUE_OUTPUTS } from "../input-output-items";

@Component({
  selector: "narik-ngx-autocomplete  , narik-autocomplete ",
  templateUrl: "narik-ngx-auto-complete.component.html",
  styleUrls: ["narik-ngx-auto-complete.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgxAutoComplete),
      multi: true
    }
  ]
})
export class NarikNgxAutoComplete extends NarikAutoComplete implements OnInit {}

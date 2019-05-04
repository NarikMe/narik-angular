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
  selector: "narik-prime-autocomplete  , narik-autocomplete ",
  templateUrl: "narik-prime-auto-complete.component.html",
  styleUrls: ["narik-prime-auto-complete.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikPrimeAutoComplete),
      multi: true
    }
  ]
})
export class NarikPrimeAutoComplete extends NarikAutoComplete implements OnInit {}

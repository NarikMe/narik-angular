import {
  NarikFormComponent,
  NARIK_UI_FORM_INPUTS
} from "./../base/narik-form-component";
import { Input, Injector } from "@angular/core";

export class NarikInput extends NarikFormComponent {
  _type = "text";
  _maxlength: number;
  _mask: any;

  @Input()
  set mask(value: any) {
    this._mask = value;
  }
  get mask(): any {
    return this._mask;
  }

  @Input()
  set maxlength(value: number) {
    this._maxlength = value;
  }
  get maxlength(): number {
    return this._maxlength;
  }

  @Input()
  set type(value: string) {
    this._type = value;
  }
  get type(): string {
    return this._type;
  }

  constructor(injector: Injector) {
    super(injector);
  }
}

export const NARIK_INPUT_INPUTS: string[] = [
  "maxlength",
  "type",
  "mask",
  ...NARIK_UI_FORM_INPUTS
];

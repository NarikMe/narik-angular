import {
  NarikFormComponent,
  NARIK_UI_FORM_INPUTS
} from "./../base/narik-form-component";
import { Input, Injector } from "@angular/core";

export class NarikInput extends NarikFormComponent {
  _type = "text";
  _maxlength: number;
  _mask: any;
  _icon: string;
  _displayStatus: string;

  @Input()
  set displayStatus(value: string) {
    this._displayStatus = value;
  }
  get displayStatus(): string {
    return this._displayStatus;
  }

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

  @Input()
  set icon(value: string) {
    this._icon = value;
  }
  get icon(): string {
    return this._icon;
  }

  constructor(injector: Injector) {
    super(injector);
  }
}

export const NARIK_INPUT_INPUTS: string[] = [
  "maxlength",
  "type",
  "mask",
  "icon",
  "displayStatus",
  ...NARIK_UI_FORM_INPUTS
];

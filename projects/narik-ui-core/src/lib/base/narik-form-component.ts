import { UUID } from "angular2-uuid";
import { MetaDataService, MODULE_UI_KEY } from "@narik/infrastructure";

import {
  EventEmitter,
  Input,
  Output,
  HostBinding,
  Injector
} from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { NarikInject } from "@narik/core";
import {
  NarikUiComponent,
  NARIK_UI_COMPONENT_INPUTS
} from "./narik-ui-component";

export class NarikFormComponent extends NarikUiComponent
  implements ControlValueAccessor {
  _value: any;
  _id: string;
  identifier: string;
  _name: string;
  _label: string;
  _readOnly: boolean;
  _placeHolder: string;
  _disabled: any;
  _required: boolean;

  uiKey: string;

  @NarikInject(MetaDataService)
  metaDataService: MetaDataService;

  @NarikInject(MODULE_UI_KEY)
  moduleUiKey: string;

  @Output()
  Change = new EventEmitter<any>();

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  @Input()
  set placeHolder(value: string) {
    this._placeHolder = value;
  }
  get placeHolder(): string {
    return this._placeHolder;
  }

  @Input()
  set readOnly(value: boolean) {
    this._readOnly = value;
  }
  get readOnly(): boolean {
    return this._readOnly;
  }

  @Input()
  @HostBinding("attr.narik-form-item-label")
  set label(value: string) {
    this._label = value;
  }

  get label(): string {
    return this._label;
  }

  @Input()
  set required(value: boolean) {
    this._required = value;
  }
  get required(): boolean {
    return this._required;
  }

  @Input()
  @HostBinding("attr.narik-form-item-key")
  set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  @Input()
  set id(val: string) {
    this._id = val;
    this.createIdentifier();
  }

  get id(): string {
    return this._id;
  }

  set value(val: any) {
    const _oldValue = this._value;
    this._value = this.convertValue(val);
    this.onModelChange(this._value);
    this.Change.emit(this._value);
    this.valueChanged(this._value, _oldValue);
  }
  get value(): any {
    return this._value;
  }

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: any) {
    this._disabled = value;
  }

  constructor(injector: Injector) {
    super(injector);
    this.createIdentifier();
  }
  createIdentifier() {
    if (!this._id) {
      this._id = "input" + UUID.UUID();
    }
  }

  writeValue(val: any): void {
    this.value = val;
  }
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  protected convertValue(value) {
    return value;
  }
  protected valueChanged(newValue, oldValue) {}
}

export const NARIK_UI_FORM_INPUTS: string[] = [
  "id",
  "name",
  "label",
  "disabled",
  "required",
  "readOnly",
  "placeHolder",
  ...NARIK_UI_COMPONENT_INPUTS
];

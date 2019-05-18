import {
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  Injector
} from "@angular/core";
import { NarikUiComponent } from "../base/narik-ui-component";
export class NarikButton extends NarikUiComponent implements AfterViewInit {
  private _disable: boolean;
  private _isBusy: boolean;

  @Input()
  set disable(value: boolean) {
    this._disable = value;
    this.setDisabledState(this.isBusy || this.disable);
  }
  get disable(): boolean {
    return this._disable;
  }

  @Input()
  set isBusy(value: boolean) {
    this._isBusy = value;
    this.setDisabledState(this.isBusy || this.disable);
  }
  get isBusy(): boolean {
    return this._isBusy;
  }

  @Input()
  cssClass: string;

  @Input()
  color: string;

  @Input()
  icon: string;

  @Input()
  fontIcon: string;

  @Input()
  busyFontIcon: string;

  @Input()
  buttonStyle: any;

  @Input()
  label: string;

  @Input()
  busyLabel: string;

  @Input()
  tag: any;

  @Input()
  tooltip: any;

  @Output()
  nClick = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.setDisabledState(this.isBusy || this.disable);
  }

  setDisabledState(state: boolean) {}
}

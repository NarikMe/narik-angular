import { UUID } from "angular2-uuid";
import { isElementVisible } from "@narik/common";
import { NarikInject } from "@narik/core";
import { DialogService, ShortcutService } from "@narik/infrastructure";
import { filter } from "rxjs/internal/operators/filter";
import { takeWhile } from "rxjs/internal/operators/takeWhile";

import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output
} from "@angular/core";

import { NarikUiComponent } from "../base/narik-ui-component";

export class NarikButton extends NarikUiComponent
  implements AfterViewInit, OnInit {
  @NarikInject(ShortcutService)
  shortcutService: ShortcutService;

  @NarikInject(DialogService)
  dialogService: DialogService;

  @NarikInject(ElementRef)
  element: ElementRef;

  get uiKey(): string {
    return "button";
  }

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
  shortcut: string;

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

  ngOnInit() {
    if (this.shortcut) {
      const uniqueId = UUID.UUID();
      this.shortcutService
        .addShortcut({
          keys: this.shortcut,
          description: this.tooltip || this.label,
          uniqueId: uniqueId
        })
        .pipe(
          takeWhile(x => this.isAlive),
          filter(
            (x: any) =>
              x.uniqueId === uniqueId &&
              isElementVisible(this.element) &&
              this.dialogService.isElementInActiveDialog(this.element)
          )
        )
        .subscribe(x => {
          if (!this.disable && !this.isBusy) {
            this.nClick.emit({
              sender: this,
              event: {}
            });
          }
        });
    }
  }
  ngAfterViewInit(): void {
    this.setDisabledState(this.isBusy || this.disable);
  }

  setDisabledState(state: boolean) {}
}

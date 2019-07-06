import { NarikInject } from "narik-core";
import { MatButton } from "@angular/material/button";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Renderer2,
  HostListener,
  Injector
} from "@angular/core";
import {
  NarikButton,
  BUTTON_DEFAULT_OPTIONS,
  ButtonDefaultOptions,
  NARIK_UI_COMPONENT_INPUTS
} from "narik-ui-core";

@Component({
  selector: "narik-mat-button , narik-button ",
  templateUrl: "narik-mat-button.component.html",
  inputs: [...NARIK_UI_COMPONENT_INPUTS]
})
export class NarikMatButtonComponent extends NarikButton
  implements OnInit, AfterViewInit {
  @ViewChild("contentButton", { static: false }) button: MatButton;

  @NarikInject(BUTTON_DEFAULT_OPTIONS, {
    buttonStyle: "mat-raised-button",
    busyFontIcon: "fa-spinner"
  })
  defaultOptions: ButtonDefaultOptions;

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  constructor(private renderer: Renderer2, injector: Injector) {
    super(injector);
    this.buttonStyle = this.defaultOptions.buttonStyle;
    this.busyFontIcon = this.defaultOptions.busyFontIcon;
    this.cssClass = this.defaultOptions.cssClass;
  }

  ngAfterViewInit(): void {
    this.setDisabledState();
  }

  setDisabledState() {
    if (this.button) {
      if (this.disable || this.isBusy) {
        this.renderer.setAttribute(
          this.button._elementRef.nativeElement,
          "disabled",
          ""
        );
      } else {
        this.renderer.removeAttribute(
          this.button._elementRef.nativeElement,
          "disabled"
        );
      }
    }
  }
  buttonClick(e) {
    if (!this.disable && !this.isBusy) {
      this.nClick.emit({
        sender: this,
        event: e
      });
    }
  }
}

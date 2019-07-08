import { NarikInject } from "narik-core";
import { UUID } from "angular2-uuid";
import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  HostListener,
  Injector
} from "@angular/core";
import {
  NarikButton,
  BUTTON_DEFAULT_OPTIONS,
  ButtonDefaultOptions
} from "narik-ui-core";

@Component({
  selector: "narik-dev-buuton , narik-button ",
  templateUrl: "narik-dev-button.component.html"
})
export class NarikDevButtonComponent extends NarikButton
  implements OnInit, AfterViewInit {
  showTooltip=false;
  uniqueId = "";

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
    this.uniqueId =  UUID.UUID();
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

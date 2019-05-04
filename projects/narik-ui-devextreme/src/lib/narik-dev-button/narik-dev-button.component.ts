import { NarikInject } from "narik-core";
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
  ButtonDefaultOptions
} from "narik-ui-core";

@Component({
  selector: "narik-dev-buuton , narik-button ",
  templateUrl: "narik-dev-button.component.html"
})
export class NarikDevButtonComponent extends NarikButton
  implements OnInit, AfterViewInit {
  @ViewChild("button1") button: any;

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

  ngOnInit() {}

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

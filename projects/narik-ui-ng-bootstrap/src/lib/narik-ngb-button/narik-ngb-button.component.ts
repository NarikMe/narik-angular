import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  Injector,
  HostListener
} from "@angular/core";
import {
  NarikButton,
  BUTTON_DEFAULT_OPTIONS,
  ButtonDefaultOptions
} from "narik-ui-core";
import { NarikInject } from "narik-core";

@Component({
  selector: "narik-ngb-button , narik-button ",
  templateUrl: "narik-ngb-button.component.html"
})
export class NarikNgbButtonComponent extends NarikButton
  implements OnInit, AfterViewInit {
  @NarikInject(BUTTON_DEFAULT_OPTIONS, {
    buttonStyle: "secondary",
    busyFontIcon: "fa-spinner"
  })
  defaultOptions: ButtonDefaultOptions;

  constructor(private renderer: Renderer2, injector: Injector) {
    super(injector);
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  ngOnInit() {
    this.buttonStyle = this.buttonStyle || this.defaultOptions.buttonStyle;
    this.busyFontIcon = this.busyFontIcon || this.defaultOptions.busyFontIcon;
  }

  ngAfterViewInit(): void {}

  buttonClick(e) {
    if (!this.disable && !this.isBusy) {
      this.nClick.emit({
        sender: this,
        event: e
      });
    }
  }
}

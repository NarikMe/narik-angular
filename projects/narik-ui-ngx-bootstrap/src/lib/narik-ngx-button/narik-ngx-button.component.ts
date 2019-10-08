import { NarikInject } from "narik-core";
import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  Injector
} from "@angular/core";
import {
  NarikButton,
  BUTTON_DEFAULT_OPTIONS,
  ButtonDefaultOptions
} from "narik-ui-core";

@Component({
  selector: "narik-ngx-buuton , narik-button ",
  templateUrl: "narik-ngx-button.component.html"
})
export class NarikNgxButtonComponent extends NarikButton
  implements OnInit, AfterViewInit {
  @NarikInject(BUTTON_DEFAULT_OPTIONS, {
    buttonStyle: "mat-raised-button",
    busyFontIcon: "fa-spinner"
  })
  defaultOptions: ButtonDefaultOptions;

  constructor(private renderer: Renderer2, injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {}
}

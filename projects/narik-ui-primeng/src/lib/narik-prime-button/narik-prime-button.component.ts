import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  HostListener,
  Injector
} from "@angular/core";
import { NarikButton } from "narik-ui-core";

@Component({
  selector: "narik-prime-buuton , narik-button ",
  templateUrl: "narik-prime-button.component.html"
})
export class NarikPrimeButtonComponent extends NarikButton
  implements OnInit, AfterViewInit {
  get uiKey(): string {
    return "button";
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  constructor(private renderer: Renderer2, injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    if (!this.cssClass) this.cssClass = this.options.cssClass;
    if (!this.buttonStyle) this.buttonStyle = this.options.buttonStyle;
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

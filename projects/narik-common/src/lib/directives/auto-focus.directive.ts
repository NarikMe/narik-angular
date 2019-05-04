import { Directive, ElementRef, Input, AfterContentInit } from "@angular/core";

@Directive({ selector: "[auto-focus]" })
export class AutoFocusDirective implements AfterContentInit {
  constructor(private element: ElementRef) {}

  @Input("auto-focus")
  active = true;

  @Input()
  autoFocusContainerName: string;

  @Input()
  timeout = 100;

  public ngAfterContentInit() {
    if (this.active) {
      setTimeout(() => {
        const selectorElements = [
          "button:not([disabled])",
          "[href]",
          "input:not([disabled]):not([readonly]):not([type='hidden'])",
          "select:not([disabled]):not([readonly])",
          "textarea:not([disabled]):not([readonly])"
        ];
        const selector = selectorElements.join();
        const parentContainer = this.autoFocusContainerName
          ? this.element.nativeElement.querySelector(
              `[narik-form-item-key='${this.autoFocusContainerName}']`
            )
          : this.element.nativeElement;
        if (parentContainer) {
          const focusItem = parentContainer.querySelector(selector);
          if (focusItem) {
            focusItem.focus();
          }
        }
      }, this.timeout);
    }
  }
}

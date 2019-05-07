import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { TAB } from "@angular/cdk/keycodes";

/**
 * TabGuardDirective
 * Uses to keep Tab circle on a element.
 * Usually use for data forms.
 */
@Directive({ selector: "[tab-guard]" })

export class TabGuardDirective {
  constructor(private element: ElementRef) {}

  /**
   * Whether tabGuard is active or not
   */
  @Input("tab-guard")
  active = true;

  @HostListener("keydown", ["$event"])
  onHover(e: KeyboardEvent) {
    if (!this.active) {
      return;
    }
    if (e.keyCode === TAB) {
      const selectorElements = [
        "button:not([disabled])",
        "[href]",
        "input:not([disabled]):not([readonly]):not([type='hidden'])",
        "select:not([disabled]):not([readonly])",
        "textarea:not([disabled]):not([readonly])",
        "[tabindex]:not([tabindex='-1'])"
      ];
      const selector = selectorElements.join();
      let tabbables = [].slice.call(
        this.element.nativeElement.querySelectorAll(selector)
      );
      tabbables = tabbables.filter(
        elem =>
          elem.offsetWidth > 0 ||
          elem.offsetHeight > 0 ||
          elem.getClientRects().length > 0
      );
      const first = tabbables[0];
      if (first) {
        const last = tabbables[tabbables.length - 1];
        const focusedElement = <any>e.target;

        const isFirstInFocus = first === focusedElement;
        const isLastInFocus = last === focusedElement;

        const tabbingForward = !e.shiftKey;

        if (
          !isFirstInFocus &&
          !isLastInFocus &&
          focusedElement.tagName === "radio"
        ) {
        }

        if (tabbingForward) {
          if (isLastInFocus) {
            first.focus();
            e.preventDefault();
          }
        } else {
          if (isFirstInFocus) {
            last.focus();
            e.preventDefault();
          }
        }
      }
    }
  }
}

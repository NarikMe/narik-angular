import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';

/**
 * AutoFocusDirective
 * Uses to set default focus on a element.
 */
@Directive({ selector: '[auto-focus]' })
export class AutoFocusDirective implements AfterContentInit {
    constructor(private element: ElementRef) {}

    /**
     * Whether autoFocus is active or not
     */
    @Input('auto-focus')
    active = true;

    /**
     * specify container name of autoFocus element.
     * if specify, directive select auto focus element from elements inside autoFocusContainerName.
     */
    @Input()
    autoFocusContainerName: string;

    /**
     * timeout
     * timeout to Focus;
     */
    @Input()
    timeout = 100;

    public ngAfterContentInit() {
        if (this.active) {
            setTimeout(() => {
                const selectorElements = [
                    'button:not([disabled])',
                    '[href]',
                    "input:not([disabled]):not([readonly]):not([type='hidden'])",
                    "input[canfocus]:not([disabled]):not([type='hidden'])",
                    'select:not([disabled]):not([readonly])',
                    'mat-select:not([disabled]):not([readonly])',
                    'textarea:not([disabled]):not([readonly])',
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

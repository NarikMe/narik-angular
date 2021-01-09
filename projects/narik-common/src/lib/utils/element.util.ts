import { ElementRef } from '@angular/core';

export function isElementVisible(element: ElementRef) {
    return (
        element.nativeElement.offsetWidth > 0 &&
        element.nativeElement.offsetHeight > 0
    );
}

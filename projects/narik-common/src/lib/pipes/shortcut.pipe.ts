import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortcut',
})
export class ShortcutPipe implements PipeTransform {
    transform(value: string): any {
        if (!value) {
            return value;
        }
        const splitItems = value.split('.');
        return splitItems
            .map((x) => {
                switch (x) {
                    case 'control':
                        return 'Ctrl';
                    case 'shift':
                        return 'Shift';
                    case 'alt':
                        return 'Alt';
                    default:
                        return x;
                }
            })
            .join('+');
    }
}

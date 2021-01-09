import { Component, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ConfigActions } from '../ThemeOptions/store/config.actions';
import { ThemeOptions } from '../theme-options';
import {
    animate,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';

@Component({
    selector: 'main-view',
    templateUrl: './base-layout.component.html',
    animations: [
        trigger('architectUIAnimation', [
            transition('* <=> *', [
                query(':enter, :leave', [
                    style({
                        opacity: 0,
                        display: 'flex',
                        flex: '1',
                        transform: 'translateY(-20px)',
                        flexDirection: 'column',
                    }),
                ]),
                query(':enter', [
                    animate(
                        '600ms ease',
                        style({ opacity: 1, transform: 'translateY(0)' })
                    ),
                ]),

                query(
                    ':leave',
                    [
                        animate(
                            '600ms ease',
                            style({
                                opacity: 0,
                                transform: 'translateY(-20px)',
                            })
                        ),
                    ],
                    { optional: true }
                ),
            ]),
        ]),
    ],
})
export class BaseLayoutComponent {
    @select('config') public config$: Observable<any>;

    _menuItems: any;
    title: string;
    _translateMenu = true;

    @Input() headerTitle = '';
    @Input() menuHeader = '';

    @Input()
    set translateMenu(value: boolean) {
        this._translateMenu = value;
    }
    get translateMenu(): boolean {
        return this._translateMenu;
    }

    @Input()
    set menuItems(value: any) {
        this._menuItems = value;
    }
    get menuItems(): any {
        return this._menuItems;
    }

    constructor(
        public globals: ThemeOptions,
        public configActions: ConfigActions
    ) {}

    toggleSidebarMobile() {
        this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
    }
}

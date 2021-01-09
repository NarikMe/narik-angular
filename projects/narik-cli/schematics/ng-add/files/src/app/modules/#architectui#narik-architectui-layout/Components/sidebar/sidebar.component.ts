import { Component, HostListener, OnInit, Input } from '@angular/core';
import { ThemeOptions } from '../../theme-options';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NarikTranslateService } from '@narik/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public extraParameter: any = [];
    _menuItems: any;
    _translateMenu = true;

    @Input()
    set menuItems(value: any) {
        this._menuItems = value;
    }
    get menuItems(): any {
        return this._menuItems;
    }

    @Input()
    set translateMenu(value: boolean) {
        this._translateMenu = value;
    }
    get translateMenu(): boolean {
        return this._translateMenu;
    }

    constructor(
        public globals: ThemeOptions,
        private activatedRoute: ActivatedRoute,
        private translateService: NarikTranslateService
    ) {}

    @select('config') public config$: Observable<any>;

    private newInnerWidth: number;
    private innerWidth: number;
    activeId = 'dashboardsMenu';

    toggleSidebar() {
        this.globals.toggleSidebar = !this.globals.toggleSidebar;
    }

    sidebarHover() {
        this.globals.sidebarHover = !this.globals.sidebarHover;
    }

    ngOnInit() {
        setTimeout(() => {
            this.innerWidth = window.innerWidth;
            if (this.innerWidth < 1200) {
                this.globals.toggleSidebar = true;
            }
        });

        this.extraParameter =
            this.activatedRoute.snapshot.firstChild.data.extraParameter || [];

        if (this.menuItems && this.translateMenu) {
            this.translateMenuTitles(this.menuItems);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.newInnerWidth = event.target.innerWidth;

        if (this.newInnerWidth < 1200) {
            this.globals.toggleSidebar = true;
        } else {
            this.globals.toggleSidebar = false;
        }
    }

    translateMenuTitles(menuItems) {
        for (const item of menuItems) {
            item.title = this.translateService.instant(item.title);
            if (item.children) {
                this.translateMenuTitles(item.children);
            }
        }
    }
}

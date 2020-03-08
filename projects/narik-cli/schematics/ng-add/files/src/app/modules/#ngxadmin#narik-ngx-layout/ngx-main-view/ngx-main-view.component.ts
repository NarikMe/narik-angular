import { NarikTranslateService } from "@narik/core";
import { NarikComponent } from "@narik/infrastructure";
import { filter } from "rxjs/operators";
import { map } from "rxjs/operators";

import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NbMenuItem } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "main-view",
  templateUrl: "ngx-main-view.component.html",
  styleUrls: ["ngx-main-view.component.scss"]
})
export class NgxMainViewComponent extends NarikComponent implements OnInit {
  _menuItems: NbMenuItem[];
  title: string;

  _translateMenu = true;
  set translateMenu(value: boolean) {
    this._translateMenu = value;
  }
  get translateMenu(): boolean {
    return this._translateMenu;
  }

  @Input()
  set menuItems(value: NbMenuItem[]) {
    this._menuItems = value;
  }
  get menuItems(): NbMenuItem[] {
    return this._menuItems;
  }

  @Input() headerTitle = "";
  @Input() menuHeader = "";

  constructor(
    private translateService: NarikTranslateService,
    router: Router,
    activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    super();
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === "primary"),
        takeWhile(x => this.isAlive)
      )
      .subscribe(ar => {
        const title =
          (ar.snapshot.data && ar.snapshot.data.title) ||
          (ar.snapshot.url[0] && ar.snapshot.url[0].path);
        if (title) {
          this.title = this.translateService.instant(this.getFirst(title));
          this.titleService.setTitle(this.title);
        }
      });
  }

  getFirst(title: string): string {
    return title ? title.split("-")[0] : "";
  }
  ngOnInit() {
    if (this.menuItems && this.translateMenu) {
      this.translateMenuTitles(this.menuItems);
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

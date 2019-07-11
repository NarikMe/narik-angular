import { Component, OnDestroy, Inject, Input } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NarikTranslateService } from "narik-core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { filter } from "rxjs/internal/operators/filter";
import { map } from "rxjs/internal/operators/map";
import { takeWhile } from "rxjs/internal/operators/takeWhile";
import {
  NarikComponent,
  AuthenticationService,
  DialogService
} from "narik-infrastructure";

@Component({
  selector: "main-view",
  templateUrl: "./coreui-main-view.component.html"
})
export class CoreUiMainViewComponent extends NarikComponent
  implements OnDestroy {
  _menuItems: any;
  title: string;
  _translateMenu = true;

  @Input() headerTitle = "";
  @Input() menuHeader = "";

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

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    private translateService: NarikTranslateService,
    router: Router,
    activatedRoute: ActivatedRoute,
    private titleService: Title,
    private dialogService: DialogService,
    private authenticationService: AuthenticationService,
    @Inject(DOCUMENT) _document?: any
  ) {
    super();
    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = _document.body.classList.contains(
        "sidebar-minimized"
      );
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ["class"]
    });

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
      item.name = this.translateService.instant(item.name || item.title);
      delete item.title;
      item.url = item.url || item.link;
      if (item.children) {
        this.translateMenuTitles(item.children);
      }
    }
  }

  changePassword() {}
  logout() {}
  ngOnDestroy(): void {
    this.changes.disconnect();
    super.ngOnDestroy();
  }
}

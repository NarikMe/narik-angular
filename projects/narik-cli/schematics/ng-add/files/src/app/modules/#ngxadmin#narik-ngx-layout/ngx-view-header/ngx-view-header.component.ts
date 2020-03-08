import { AuthenticationService } from "@narik/infrastructure";
import { Component, Input } from "@angular/core";
import { NbSidebarService, NbMenuItem } from "@nebular/theme";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "ngx-view-header",
  styleUrls: ["ngx-view-header.component.scss"],
  templateUrl: "ngx-view-header.component.html"
})
export class NgxHeaderComponent {
  @Input() position = "normal";
  @Input() headerTitle = "";
  user: any;

  userMenu: NbMenuItem[] = [
    { title: "changePass", data: "changePass" },
    { title: "logout", data: "logout" }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    translateService: TranslateService,
    authenticationService: AuthenticationService
  ) {
    for (const menu of this.userMenu) {
      menu.title = translateService.instant(menu.title);
    }
    this.user = authenticationService.currentUserValue;
  }

  goToHome() {}

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");

    return false;
  }
}

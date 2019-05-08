import { Component } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  isOnNavigation = false;
  constructor(router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.isOnNavigation = true;
      } else if (event instanceof NavigationEnd) {
        this.isOnNavigation = false;
      }
    });
  }
}

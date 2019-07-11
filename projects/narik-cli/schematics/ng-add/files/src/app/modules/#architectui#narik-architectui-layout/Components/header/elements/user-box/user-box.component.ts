import { Component, OnInit } from "@angular/core";
import { ThemeOptions } from "../../../../theme-options";
import { DialogService, AuthenticationService } from "narik-infrastructure";

@Component({
  selector: "app-user-box",
  templateUrl: "./user-box.component.html"
})
export class UserBoxComponent implements OnInit {
  constructor(
    public globals: ThemeOptions,
    private dialogService: DialogService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  changePassword() {}
  logout() {}
}

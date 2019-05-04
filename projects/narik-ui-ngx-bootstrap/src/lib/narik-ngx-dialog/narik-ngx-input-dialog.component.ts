import { Component, OnInit } from "@angular/core";
import { DialogInputContent } from "narik-infrastructure";

@Component({
  templateUrl: "narik-ngx-input-dialog.component.html"
})
export class NarikNgxInputDialog
  implements OnInit, DialogInputContent {
  entity: any = {};
  fields: any[] = [];
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { DialogInputContent } from "narik-infrastructure";

@Component({
  templateUrl: "narik-dev-input-dialog.component.html"
})
export class NarikDevInputDialog
  implements OnInit, DialogInputContent {
  entity: any = {};
  fields: any[] = [];
  constructor() {}

  ngOnInit() {}
}

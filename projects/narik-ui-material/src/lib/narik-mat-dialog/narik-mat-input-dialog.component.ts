import { Component, OnInit } from "@angular/core";
import { DialogInputContent } from "narik-infrastructure";

@Component({
  templateUrl: "narik-mat-input-dialog.component.html"
})
export class NarikMatInputDialog
  implements OnInit, DialogInputContent {
  entity: any = {};
  fields: any[] = [];
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { DialogInputContent } from "@narik/infrastructure";

@Component({
  templateUrl: "narik-nb-input-dialog.component.html"
})
export class NarikNebularInputDialog
  implements OnInit, DialogInputContent {
  entity: any = {};
  fields: any[] = [];
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { DialogInputContent } from "@narik/infrastructure";

@Component({
  templateUrl: "narik-ngb-input-dialog.component.html"
})
export class NarikNgbInputDialog
  implements OnInit, DialogInputContent {
  entity: any = {};
  fields: any[] = [];
  constructor() {}

  ngOnInit() {}
}

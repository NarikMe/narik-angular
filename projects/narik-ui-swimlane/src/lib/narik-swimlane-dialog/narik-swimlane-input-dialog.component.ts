import { Component, OnInit } from "@angular/core";
import { DialogInputContent } from "narik-infrastructure";

@Component({
  templateUrl: "narik-swimlane-input-dialog.component.html"
})
export class NarikSwimlaneInputDialog
  implements OnInit, DialogInputContent {
  entity: any = {};
  fields: any[] = [];
  constructor() {}

  ngOnInit() {}
}

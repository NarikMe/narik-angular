import { Component, OnInit } from "@angular/core";
import { DialogInputContent } from "narik-infrastructure";

@Component({
  templateUrl: "narik-prime-input-dialog.component.html"
})
export class NarikPrimeInputDialog
  implements OnInit, DialogInputContent {
  entity: any = {};
  fields: any[] = [];
  constructor() {}

  ngOnInit() {}
}

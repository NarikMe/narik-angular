import { ComponentLoaderHostDirective } from "narik-common";
import {
  DialogAction,
  DialogContainer,
  DialogOption,
  DialogRef
} from "narik-infrastructure";

import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  templateUrl: "narik-ngb-dialog-container.component.html",
  styleUrls: ["narik-ngb-dialog-container.component.css"]
})
export class NarikNgbDialogContainer implements DialogContainer, OnInit {
  @ViewChild(ComponentLoaderHostDirective)
  loaderHost: ComponentLoaderHostDirective;
  options: DialogOption;
  title: string;
  actions: DialogAction[] = [];
  dialogRef: DialogRef<any>;
  get contentContainerRef(): ViewContainerRef {
    return this.loaderHost.viewContainerRef;
  }

  constructor() {}

  ngOnInit() {}

  actionClick(item: DialogAction) {
    this.dialogRef.close(
      {
        componentInstance: this.dialogRef.componentInstance,
        dialogResult: item.dialogResult
      },
      "DIALOG"
    );
  }
}

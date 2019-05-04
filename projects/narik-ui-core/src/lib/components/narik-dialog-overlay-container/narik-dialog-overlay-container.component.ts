import { ComponentLoaderHostDirective } from "narik-common";
import {
  DialogOption,
  DialogOverlayContainer,
  DialogRef
} from "narik-infrastructure";

import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  templateUrl: "narik-dialog-overlay-container.component.html",
  styleUrls: ["narik-dialog-overlay-container.component.css"]
})
export class NarikDialogOverlayContainerComponent
  implements DialogOverlayContainer, OnInit {
  @ViewChild(ComponentLoaderHostDirective)
  loaderHost: ComponentLoaderHostDirective;

  dialogRef: DialogRef<any>;
  get contentContainerRef(): ViewContainerRef {
    return this.loaderHost.viewContainerRef;
  }

  options: DialogOption;
  constructor() {}

  ngOnInit() {}

  modalClick(e) {
    if (!this.options.isFullScreen && !this.options.disableAutoClose) {
      this.dialogRef.close(undefined, "DIALOG");
    }
  }
}

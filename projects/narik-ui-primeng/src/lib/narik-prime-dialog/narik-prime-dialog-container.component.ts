import { ComponentLoaderHostDirective } from "narik-common";
import {
  DialogAction,
  DialogContainer,
  DialogOption,
  DialogRef
} from "narik-infrastructure";

import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  templateUrl: "narik-prime-dialog-container.component.html",
  styleUrls: ["narik-prime-dialog-container.component.css"]
})
export class NarikPrimeDialogContainer implements DialogContainer, OnInit {
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
}
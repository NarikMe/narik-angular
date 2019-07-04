import {
  DialogContainer,
  DialogOption,
  DialogAction,
  DialogRef
} from "narik-infrastructure";
import { EventEmitter, ViewChild, ViewContainerRef } from "@angular/core";
import { ComponentLoaderHostDirective } from "narik-common";
import { AnimationEvent } from "@angular/animations";
import {
  state,
  style,
  transition,
  animate
} from "@angular/animations";

export class NarikDialogContainer implements DialogContainer {
  isOpen = false;
  closeAnimationCompleted = new EventEmitter<any>();
  @ViewChild(ComponentLoaderHostDirective, { static: true })
  loaderHost: ComponentLoaderHostDirective;
  options: DialogOption;
  title: string;
  actions: DialogAction[] = [];
  dialogRef: DialogRef<any>;
  get contentContainerRef(): ViewContainerRef {
    return this.loaderHost.viewContainerRef;
  }

  actionClick(item: DialogAction) {
    this.dialogRef.close(
      {
        componentInstance: this.dialogRef.componentInstance,
        dialogResult: item.dialogResult
      },
      "DIALOG"
    );
  }

  _onAnimationDone(event: AnimationEvent) {
    if (event.toState === "closed") {
      this.closeAnimationCompleted.emit(event);
    }
  }
}

export const DialogAnimationBody = [
  state("closed", style({ opacity: 0, transform: "scale(0.7)" })),
  state("open", style({ transform: "none" })),
  transition(
    "closed => open",
    animate(
      "150ms cubic-bezier(0, 0, 0.2, 1)",
      style({ transform: "none", opacity: 1 })
    )
  ),
  transition(
    "open => closed",
    animate("75ms cubic-bezier(0.4, 0.0, 0.2, 1)", style({ opacity: 0 }))
  )
];

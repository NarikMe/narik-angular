import { Component, OnInit } from "@angular/core";
import { NarikDialogContainer, DialogAnimationBody } from "@narik/core";
import { trigger } from "@angular/animations";

@Component({
  templateUrl: "narik-prime-dialog-container.component.html",
  styleUrls: ["narik-prime-dialog-container.component.css"],
  animations: [trigger("openClose", DialogAnimationBody)]
})
export class NarikPrimeDialogContainer extends NarikDialogContainer
  implements OnInit {
  ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { NarikDialogContainer, DialogAnimationBody } from "narik-core";
import { trigger } from "@angular/animations";

@Component({
  templateUrl: "narik-nb-dialog-container.component.html",
  styleUrls: ["narik-nb-dialog-container.component.css"],
  animations: [trigger("openClose", DialogAnimationBody)]
})
export class NarikNebularDialogContainer extends NarikDialogContainer
  implements OnInit {
  ngOnInit() {}
}

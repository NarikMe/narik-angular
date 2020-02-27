import { Component, OnInit } from "@angular/core";
import { NarikDialogContainer, DialogAnimationBody } from "@narik/core";
import { trigger } from "@angular/animations";

@Component({
  templateUrl: "narik-dev-dialog-container.component.html",
  styleUrls: ["narik-dev-dialog-container.component.css"],
  animations: [trigger("openClose", DialogAnimationBody)]
})
export class NarikDevDialogContainer extends NarikDialogContainer
  implements OnInit {
  ngOnInit() {}
}

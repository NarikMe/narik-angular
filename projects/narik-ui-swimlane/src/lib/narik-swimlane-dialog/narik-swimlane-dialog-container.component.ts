import { Component, OnInit } from "@angular/core";
import { NarikDialogContainer, DialogAnimationBody } from "@narik/core";
import { trigger } from "@angular/animations";

@Component({
  templateUrl: "narik-swimlane-dialog-container.component.html",
  styleUrls: ["narik-swimlane-dialog-container.component.css"],
  animations: [trigger("openClose", DialogAnimationBody)]
})
export class NarikSwimlaneDialogContainer extends NarikDialogContainer
  implements OnInit {
  ngOnInit() {}
}

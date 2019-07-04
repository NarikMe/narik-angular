import { Component, OnInit } from "@angular/core";
import { NarikDialogContainer, DialogAnimationBody } from "narik-core";
import { trigger } from "@angular/animations";

@Component({
  templateUrl: "narik-ngb-dialog-container.component.html",
  styleUrls: ["narik-ngb-dialog-container.component.css"],
  animations: [trigger("openClose", DialogAnimationBody)]
})
export class NarikNgbDialogContainer extends NarikDialogContainer
  implements OnInit {
  ngOnInit() {}
}

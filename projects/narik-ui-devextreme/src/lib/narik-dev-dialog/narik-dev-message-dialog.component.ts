import { Component, OnInit, Inject } from "@angular/core";
import { PARAMETERS } from "@narik/infrastructure";

@Component({
  templateUrl: "narik-dev-message-dialog.component.html",
  styleUrls: ["narik-dev-message-dialog.component.css"],
})
export class NarikDevMessageDialog implements OnInit {
  message: string;
  constructor(@Inject(PARAMETERS) parameters: any) {
    if (parameters) {
      this.message = parameters.message;
    }
  }

  ngOnInit() {}
}

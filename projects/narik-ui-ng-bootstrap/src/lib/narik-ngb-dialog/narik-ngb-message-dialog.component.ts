import { Component, OnInit, Inject } from "@angular/core";
import { PARAMETERS } from "@narik/infrastructure";

@Component({
  templateUrl: "narik-ngb-message-dialog.component.html",
  styleUrls: ["narik-ngb-message-dialog.component.css"],
})
export class NarikNgbMessageDialog implements OnInit {
  message: string;
  constructor(@Inject(PARAMETERS) parameters: any) {
    if (parameters) {
      this.message = parameters.message;
    }
  }

  ngOnInit() {}
}

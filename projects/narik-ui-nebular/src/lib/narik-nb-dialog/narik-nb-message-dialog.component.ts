import { Component, OnInit, Inject } from "@angular/core";
import { PARAMETERS } from "@narik/infrastructure";

@Component({
  templateUrl: "narik-nb-message-dialog.component.html",
  styleUrls: ["narik-nb-message-dialog.component.css"],
})
export class NarikNebularMessageDialog implements OnInit {
  message: string;
  constructor(@Inject(PARAMETERS) parameters: any) {
    if (parameters) {
      this.message = parameters.message;
    }
  }

  ngOnInit() {}
}

import { Component, OnInit, Inject } from "@angular/core";
import { PARAMETERS } from "@narik/infrastructure";

@Component({
  templateUrl: "narik-ngx-message-dialog.component.html",
})
export class NarikNgxMessageDialog implements OnInit {
  message: string;
  constructor(@Inject(PARAMETERS) parameters: any) {
    if (parameters) {
      this.message = parameters.message;
    }
  }

  ngOnInit() {}
}

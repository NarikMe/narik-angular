import { Component, OnInit, Inject } from "@angular/core";
import { PARAMETERS } from "@narik/infrastructure";

@Component({
  templateUrl: "narik-prime-message-dialog.component.html",
  styleUrls: ["narik-prime-message-dialog.component.css"],
})
export class NarikPrimeMessageDialog implements OnInit {
  message: string;
  constructor(@Inject(PARAMETERS) parameters: any) {
    if (parameters) {
      this.message = parameters.message;
    }
  }

  ngOnInit() {}
}

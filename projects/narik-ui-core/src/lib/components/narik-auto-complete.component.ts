import { OnInit } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

import { NarikDataDisplayValueComponent } from "../base/narik-data-display-value-component";

export class NarikAutoComplete extends NarikDataDisplayValueComponent
  implements ControlValueAccessor, OnInit {
  protected useData(data: any[]) {
    throw new Error("Subclass Must Override useData.");
  }
}

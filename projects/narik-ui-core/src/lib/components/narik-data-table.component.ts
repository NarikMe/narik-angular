import { NarikUiComponent } from "../base/narik-ui-component";
import { ListRowCommand } from "narik-infrastructure";
import { Input, Output, EventEmitter } from "@angular/core";
export class NarikDataTable extends NarikUiComponent {
  get uiKey(): string {
    return "data-table";
  }

  @Input()
  rowCommands?: ListRowCommand[];

  @Input()
  rowCommandType?: "Menu" | "Flat" = "Flat";

  @Output()
  rowCommandClick = new EventEmitter<{ key: string; item: any }>();
}

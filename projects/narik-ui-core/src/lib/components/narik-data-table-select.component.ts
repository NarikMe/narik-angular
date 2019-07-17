import { OnInit, Input } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

import { NarikSelect, NARIK_SELECT_INPUTS } from "./narik-select.component";

export class NarikDataTableSelect extends NarikSelect
  implements ControlValueAccessor, OnInit {
  get uiKey(): string {
    return "data-table-select";
  }

  @Input()
  gridOptions: any;
}

export const NARIK_DATA_TABLE_SELECT_INPUTS: string[] = [
  ...NARIK_SELECT_INPUTS,
  "gridOptions"
];

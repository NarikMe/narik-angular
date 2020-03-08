
import { NarikDataTable } from "@narik/ui-core";

import {
  Component,
  Injector,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "narik-ngb-data-table , narik-data-table",
  templateUrl: "narik-ngb-data-table.component.html"
})
export class NarikNgbDataTable extends NarikDataTable {
  constructor(
    injector: Injector,
    private changeDetector: ChangeDetectorRef,
    @Inject(DOCUMENT) private document
  ) {
    super(injector);
  }
}

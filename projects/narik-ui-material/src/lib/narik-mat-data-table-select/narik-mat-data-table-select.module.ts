import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { TranslateModule } from "@ngx-translate/core";
import { MatToolbarModule } from "@angular/material";
import { MatTooltipModule } from "@angular/material/tooltip";

import { NarikMatDataTableSelect } from "./narik-mat-data-table-select.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NarikMatToolbarModule } from "../narik-mat-toolbar/narik-mat-toolbar.module";
import { NarikMatDataTableModule } from "../narik-mat-data-table/narik-mat-data-table.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    TranslateModule,
    NarikMatToolbarModule,
    NarikMatDataTableModule
  ],
  declarations: [NarikMatDataTableSelect],
  exports: [NarikMatDataTableSelect],
  providers: []
})
export class NarikMatDataTableSelectModule {}

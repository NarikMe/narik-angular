import { COMPONENTS, DYNAMIC_COMPONENTS } from './index';
import { NgModule, Injectable } from '@angular/core';
import { NarikUiMaterialModule } from '@narik/ui-material';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DATE_FORMATS,
  NativeDateAdapter,
  DateAdapter,
} from '@angular/material/core';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};
@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: any): string {
    if (displayFormat === 'input') {
      return new DatePipe('en-US').transform(date, 'yyyy/MM/dd') as string;
    } else {
      return super.format(date, displayFormat);
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NarikUiMaterialModule,
    MatCardModule,
  ],
  declarations: [COMPONENTS],
  exports: [],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class ShareModule {
  // https://github.com/angular/angular/issues/35314
  static dynamicComponents = [...DYNAMIC_COMPONENTS];
}

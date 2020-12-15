import { NarikUiPrimeModule } from '@narik/ui-primeng';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { COMPONENTS, DYNAMIC_COMPONENTS } from './index';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NarikUiPrimeModule],
  declarations: [COMPONENTS],
  exports: [],
  providers: [],
})
export class ShareModule {
  // https://github.com/angular/angular/issues/35314
  static dynamicComponents = [...DYNAMIC_COMPONENTS];
}

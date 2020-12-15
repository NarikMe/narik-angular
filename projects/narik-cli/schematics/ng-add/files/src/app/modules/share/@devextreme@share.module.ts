import { COMPONENTS, DYNAMIC_COMPONENTS } from './index';
import { NgModule } from '@angular/core';
import { NarikUiDevextremeModule } from '@narik/ui-devextreme';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NarikUiDevextremeModule],
  declarations: [COMPONENTS],
  exports: [],
  providers: [],
})
export class ShareModule {
  // https://github.com/angular/angular/issues/35314
  static dynamicComponents = [...DYNAMIC_COMPONENTS];
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NarikUiNgBootstrapModule } from '@narik/ui-ng-bootstrap';
import { NarikSwimlaneDataTableModule } from '@narik/ui-swimlane';
import { COMPONENTS, DYNAMIC_COMPONENTS } from './index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NarikUiNgBootstrapModule,
    NarikSwimlaneDataTableModule,
  ],
  declarations: [COMPONENTS],
  exports: [],
  providers: [],
})
export class ShareModule {
  // https://github.com/angular/angular/issues/35314
  static dynamicComponents = [...DYNAMIC_COMPONENTS];
}

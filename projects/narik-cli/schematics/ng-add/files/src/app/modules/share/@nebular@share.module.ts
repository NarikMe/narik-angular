import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NarikUiNebularModule } from '@narik/ui-nebular';
import { NarikSwimlaneDataTableModule } from '@narik/ui-swimlane';
import { NbCardModule } from '@nebular/theme';
import { COMPONENTS, DYNAMIC_COMPONENTS } from './index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NarikUiNebularModule,
    NarikSwimlaneDataTableModule,
    NbCardModule,
  ],
  declarations: [COMPONENTS],
  exports: [],
  providers: [],
})
export class ShareModule {
  // https://github.com/angular/angular/issues/35314
  static dynamicComponents = [...DYNAMIC_COMPONENTS];
}

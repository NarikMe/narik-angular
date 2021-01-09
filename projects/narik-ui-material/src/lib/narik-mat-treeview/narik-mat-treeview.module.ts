import { NgModule } from '@angular/core';

import { MatTreeModule } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { NarikMatTreeview } from './narik-mat-treeview.component';
import { NarikMatToolbarModule } from '../narik-mat-toolbar/narik-mat-toolbar.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatTreeModule,
        NarikMatToolbarModule,
        MatIconModule,
    ],
    declarations: [NarikMatTreeview],
    exports: [NarikMatTreeview],
    providers: [],
})
export class NarikMatTreeviewModule {}

import { Provider } from "@angular/core";
import { NgxHeaderComponent } from "./ngx-view-header/ngx-view-header.component";
import { NgxMainViewComponent } from "./ngx-main-view/ngx-main-view.component";

export const COMPONENTS: Provider[] = [
  NgxHeaderComponent,
  NgxMainViewComponent
];

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminMainComponent } from "./main/admin-main.component";
import { ModuleLoadCompletelyGuard } from "narik-app-core";

const routes: Routes = [
  {
    path: "",
    canActivate: [ModuleLoadCompletelyGuard],
    data: { moduleKey: "main" },
    component: AdminMainComponent
  },
  {
    path: "index",
    canActivate: [ModuleLoadCompletelyGuard],
    data: { moduleKey: "main" },
    component: AdminMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

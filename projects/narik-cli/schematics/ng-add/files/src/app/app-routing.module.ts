import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { MainViewComponent } from "./main-view/main-view.component";
import { ModuleLoadCompletelyGuard , FormViewRoute } from "@narik/app-core";

const routes: Routes = [
  {
    path: "",
    canActivate: [ModuleLoadCompletelyGuard],
    data: { moduleKey: "main" },
    component: MainComponent,
    children: [
      { path: "", component: MainViewComponent },
      ...FormViewRoute("main")
    ]
  },
  {
    path: "index",
    canActivate: [ModuleLoadCompletelyGuard],
    data: { moduleKey: "main" },
    component: MainComponent,
    children: [
      { path: "", component: MainViewComponent },
      ...FormViewRoute("main")
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

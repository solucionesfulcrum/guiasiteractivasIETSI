import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutInfo } from './modules/layout-info/layout-info/layout-info';

const routes: Routes = [
  {
    path:'',
    loadChildren: () =>
      import('./modules/layout-info/layout-info-module').then((m) => m.LayoutInfoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

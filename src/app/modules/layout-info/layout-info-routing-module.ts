import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoItems } from '../listado-items/listado-items/listado-items';
import path from 'path';
import { LayoutInfo } from './layout-info/layout-info';

const routes: Routes = [
  {
    path: '',
    component: LayoutInfo,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../listado-items/listado-items-module').then((c) => c.ListadoItemsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutInfoRoutingModule { }

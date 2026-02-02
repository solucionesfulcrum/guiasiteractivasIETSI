import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoItemsRoutingModule } from './listado-items-routing-module';
import { ListadoItems } from './listado-items/listado-items';
import { MaterialModule } from '../../materials/material-module';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    ListadoItems
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListadoItemsRoutingModule,
    MaterialModule
  ]
})
export class ListadoItemsModule { }

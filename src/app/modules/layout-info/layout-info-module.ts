import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutInfoRoutingModule } from './layout-info-routing-module';
import { LayoutInfo } from './layout-info/layout-info';
import { Header } from './components/header/header';
import { MaterialModule } from '../../materials/material-module';


@NgModule({
  declarations: [
    LayoutInfo,
    Header
  ],
  imports: [
    CommonModule,
    LayoutInfoRoutingModule,
    MaterialModule
  ]
})
export class LayoutInfoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnButton } from './components/own-button/own-button';

const modules = [
  CommonModule
]

const components = [
  OwnButton
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }

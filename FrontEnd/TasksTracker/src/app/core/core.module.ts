import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreStoreModule } from './core-store/core-store.module';

@NgModule({
  imports: [
    CoreStoreModule
  ],
  exports: [
    CoreStoreModule
  ]
})
export class CoreModule { }

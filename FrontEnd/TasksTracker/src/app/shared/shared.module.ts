import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ConnectFormDirective } from './directives/connect-form.directive';


@NgModule({
  declarations: [
    ConnectFormDirective
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    MaterialModule,
    ConnectFormDirective
  ]
})
export class SharedModule { }

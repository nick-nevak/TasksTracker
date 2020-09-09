import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    SideMenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports: [
    SideMenuComponent,
    HeaderComponent
  ]
})
export class AppCommonModule { }

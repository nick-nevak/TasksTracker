import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyItemsComponent } from './study-items/study-items.component';
import { StudyItemsTableComponent } from './study-items-table/study-items-table.component';
import { StudyItemEditComponent } from './study-item-edit/study-item-edit.component';
import { StudyItemCreateComponent } from './study-item-create/study-item-create.component';
import { StudyItemsRoutingModule } from './study-items-routing.module';



@NgModule({
  declarations: [
    StudyItemsComponent,
    StudyItemsTableComponent,
    StudyItemEditComponent,
    StudyItemCreateComponent
  ],
  imports: [
    CommonModule,
    StudyItemsRoutingModule
  ]
})
export class StudyItemsModule { }

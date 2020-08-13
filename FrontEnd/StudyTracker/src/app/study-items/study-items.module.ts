import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyItemsComponent } from './study-items/study-items.component';
import { StudyItemsTableComponent } from './study-items-table/study-items-table.component';
import { StudyItemEditComponent } from './study-item-edit/study-item-edit.component';
import { StudyItemsRoutingModule } from './study-items-routing.module';
import { SharedModule } from '././../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StudyItemsComponent,
    StudyItemsTableComponent,
    StudyItemEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudyItemsRoutingModule,
    FormsModule
  ]
})
export class StudyItemsModule { }

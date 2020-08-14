import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TaskEditComponent } from './task-edit/task-edit.component';



@NgModule({
  declarations: [
    TasksComponent,
    TasksTableComponent,
    TaskEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }

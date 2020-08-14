import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksListComponent } from './container/tasks-list/tasks-list.component';
import { TaskEditComponent } from './container/task-edit/task-edit.component';
import { TasksTableComponent } from './presentational/tasks-table/tasks-table.component';
import { TaskEditFormComponent } from './presentational/task-edit-form/task-edit-form.component';



@NgModule({
  declarations: [
    TasksComponent,
    TasksListComponent,
    TaskEditComponent,
    TasksTableComponent,
    TaskEditFormComponent
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

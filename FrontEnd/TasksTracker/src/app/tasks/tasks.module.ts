import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskEditContainerComponent } from './container/task-edit-container/task-edit-container.component';
import { TaskEditFormComponent } from './presentational/task-edit-form/task-edit-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TasksScreenComponent } from './presentational/tasks-screen/tasks-screen.component';
import { TasksScreenContainerComponent } from './container/tasks-screen-container/tasks-screen-container.component';
import { TasksListComponent } from './presentational/tasks-list/tasks-list.component';
import { TaskCreatorComponent } from './presentational/task-creator/task-creator.component';



@NgModule({
  declarations: [
    TasksComponent,
    TaskEditContainerComponent,
    TasksListComponent,
    TaskEditFormComponent,
    TasksScreenComponent,
    TasksScreenContainerComponent,
    TaskCreatorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgScrollbarModule
  ]
})
export class TasksModule { }

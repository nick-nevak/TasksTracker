import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TasksTableComponent
      },
      {
        path: 'create',
        component: TaskEditComponent
      },
      {
        path: 'edit/:id',
        component: TaskEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

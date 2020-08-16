import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './container/tasks-list/tasks-list.component';
import { TaskEditComponent } from './container/task-edit/task-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: '',
        component: TasksListComponent,
        children: [
          {
            path: 'create',
            component: TaskEditComponent,
          },
          {
            path: ':id',
            component: TaskEditComponent,
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

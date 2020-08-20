import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskEditContainerComponent } from './container/task-edit-container/task-edit-container.component';
import { TasksScreenContainerComponent } from './container/tasks-screen-container/tasks-screen-container.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      {
        path: 'today',
        component: TasksScreenContainerComponent,
        children: [
          {
            path: ':id',
            component: TaskEditContainerComponent,
          },
        ]
      },
      { path: '', redirectTo: 'today', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

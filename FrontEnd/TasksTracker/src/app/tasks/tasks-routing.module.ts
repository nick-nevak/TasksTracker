import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskEditContainerComponent } from './container/task-edit-container/task-edit-container.component';
import { TasksScreenContainerComponent } from './container/tasks-screen-container/tasks-screen-container.component';


const childRouteConfig = {
  component: TasksScreenContainerComponent,
  children: [
    {
      path: ':id',
      component: TaskEditContainerComponent,
    },
  ]
};

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      {
        path: 'today',
        ...childRouteConfig
      },
      {
        path: 'week',
        ...childRouteConfig
      },
      {
        path: 'all',
        ...childRouteConfig
      },
      {
        path: 'completed',
        ...childRouteConfig
      },
      {
        path: 'trash',
        ...childRouteConfig
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

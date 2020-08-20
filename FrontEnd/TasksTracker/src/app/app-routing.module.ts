import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'tasks',
  //   loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
  // },
  { path: '',   redirectTo: 'tasks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

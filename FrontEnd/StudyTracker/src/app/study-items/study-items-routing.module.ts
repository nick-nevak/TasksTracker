import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyItemsComponent } from './study-items/study-items.component';
import { StudyItemsTableComponent } from './study-items-table/study-items-table.component';
import { StudyItemEditComponent } from './study-item-edit/study-item-edit.component';
import { StudyItemCreateComponent } from './study-item-create/study-item-create.component';

const routes: Routes = [
  {
    path: '',
    component: StudyItemsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: StudyItemsTableComponent
      },
      {
        path: 'create',
        component: StudyItemCreateComponent
      },
      {
        path: 'edit/:id',
        component: StudyItemEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyItemsRoutingModule { }

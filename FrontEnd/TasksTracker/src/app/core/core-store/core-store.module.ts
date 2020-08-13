import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Task } from '../../tasks/models/task';
import { TasksEffects } from './tasks/tasks.effects';
import { tasksReducer, TasksState } from './tasks/tasks.reducer';

export interface AppState {
  tasksState: TasksState;
}

const reducers = {
  tasksState: tasksReducer
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TasksEffects])
  ]
})
export class CoreStoreModule { }

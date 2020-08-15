import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './tasks/tasks.effects';
import { PrioritiesEffects } from './priorities/priorities.effects';
import { tasksReducer, TasksState } from './tasks/tasks.reducer';
import { PrioritiesState, prioritiesReducer } from './priorities/priorities.reducer';

export interface AppState {
  tasksState: TasksState;
  prioritiesState: PrioritiesState;
}

const reducers = {
  tasksState: tasksReducer,
  prioritiesState: prioritiesReducer
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TasksEffects, PrioritiesEffects])
  ]
})
export class CoreStoreModule { }

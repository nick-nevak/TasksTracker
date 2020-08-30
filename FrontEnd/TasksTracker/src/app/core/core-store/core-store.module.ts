import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './tasks/tasks.effects';
import { PrioritiesEffects } from './priorities/priorities.effects';
import { tasksReducer, TasksState } from './tasks/tasks.reducer';
import { PrioritiesState, prioritiesReducer } from './priorities/priorities.reducer';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

export interface AppState {
  tasksState: TasksState;
  prioritiesState: PrioritiesState;
  router: any;
}

const reducers = {
  tasksState: tasksReducer,
  prioritiesState: prioritiesReducer,
  router: routerReducer
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TasksEffects, PrioritiesEffects]),
    StoreRouterConnectingModule.forRoot()
  ]
})
export class CoreStoreModule { }

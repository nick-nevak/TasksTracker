import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';
import { AppState } from '../core-store.module';
import { tasksAdapter } from './tasks.reducer';
import { from } from 'rxjs';


const selectTasksState = createFeatureSelector<AppState, TasksState>('tasksState');
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = tasksAdapter.getSelectors();

export const selectTasks = createSelector(
  selectTasksState,
  selectAll
);

export const selectAreTasksLoaded = createSelector(
  selectTasksState,
  (state: TasksState) => state.areTasksLoaded
);


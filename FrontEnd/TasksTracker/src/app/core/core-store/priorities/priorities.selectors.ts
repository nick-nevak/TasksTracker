import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PrioritiesState } from './priorities.reducer';
import { AppState } from '../core-store.module';
import { prioritiesAdapter } from './priorities.reducer';


const selectPrioritiesState = createFeatureSelector<AppState, PrioritiesState>('prioritiesState');
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = prioritiesAdapter.getSelectors();

export const selectPriorities = createSelector(
  selectPrioritiesState,
  selectAll
);


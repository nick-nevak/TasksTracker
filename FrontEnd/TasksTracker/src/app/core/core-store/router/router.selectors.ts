import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../core-store.module';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<AppState, RouterReducerState<any>>('router');

export const {
  selectCurrentRoute,   // select the current route
  selectFragment,       // select the current route fragment
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = getSelectors(selectRouter);
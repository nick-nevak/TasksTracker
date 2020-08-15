import { createAction, props } from '@ngrx/store';
import { Priority } from '../../models/priority';

const LOAD = '[Priorities] LOAD';
const LOAD_SUCCESS = '[Priorities] LOAD_SUCCESS';

export const loadPriorities = createAction(
  LOAD
);

export const loadPrioritiesSuccess = createAction(
  LOAD_SUCCESS,
  props<{priorities: Priority[]}>()
);


import { Action, createReducer, on } from '@ngrx/store';
import * as PrioritiesActions from './priorities.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Priority } from '../../models/priority';

export interface PrioritiesState extends EntityState<Priority> {
}

export const prioritiesAdapter: EntityAdapter<Priority> = createEntityAdapter<Priority>({
  selectId: (priority: Priority) => priority._id
});

const initialState: PrioritiesState = prioritiesAdapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(PrioritiesActions.loadPrioritiesSuccess, (state, { priorities }) => {
    return prioritiesAdapter.addMany(priorities, state);
  })
);

export function prioritiesReducer(state: PrioritiesState | undefined = initialState, action: Action): PrioritiesState {
  return reducer(state, action);
}





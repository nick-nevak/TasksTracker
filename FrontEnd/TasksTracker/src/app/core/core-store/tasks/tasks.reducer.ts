import { Action, createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from '../../../tasks/models/task';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface TasksState extends EntityState<Task> {
  areTasksLoaded: boolean;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task._id
});

const initialState: TasksState = tasksAdapter.getInitialState({
  areTasksLoaded: false
});

const reducer = createReducer(
  initialState,
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => {
    return tasksAdapter.addMany(tasks, { ...state, areTasksLoaded: true });
  }),
  on(TasksActions.createTaskSuccess, (state, { task }) => {
    return tasksAdapter.addOne(task, state);
  }),
  on(TasksActions.updateTaskSuccess, (state, { task }) => {
    return tasksAdapter.setOne(task, state);
  }),
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => {
    return tasksAdapter.removeOne(taskId, state);
  })
);

export function tasksReducer(state: TasksState | undefined = initialState, action: Action): TasksState {
  return reducer(state, action);
}


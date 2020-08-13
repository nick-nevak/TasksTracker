import { Action, createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from '../../../tasks/models/task';

export interface TasksState {
  tasks: Task[];
  areTasksLoaded: boolean;
}

const initialState: TasksState = {
  tasks: [],
  areTasksLoaded: false
};

const reducer = createReducer(
  initialState,
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks: [...state.tasks, ...tasks], areTasksLoaded: true })),
  on(TasksActions.createTaskSuccess, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TasksActions.updateTaskSuccess, (state, { task }) => ({ ...state, tasks: state.tasks.map(t => t._id === task._id ? task : t) })),
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => ({ ...state, tasks: state.tasks.filter(t => t._id !== taskId) }))
);

export function tasksReducer(state: TasksState | undefined = initialState, action: Action): TasksState {
  return reducer(state, action);
}


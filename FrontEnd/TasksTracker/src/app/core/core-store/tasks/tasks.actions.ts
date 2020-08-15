import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task';

const LOAD = '[Tasks] LOAD';
const LOAD_SUCCESS = '[Tasks] LOAD_SUCCESS';
const CREATE = '[Task] CREATE';
const CREATE_SUCCESS = '[Task] CREATE_SUCCESS';
const UPDATE = '[Task] UPDATE';
const UPDATE_SUCCESS = '[Task] UPDATE_SUCCESS';
const DELETE = '[Task] DELETE';
const DELETE_SUCCESS = '[Task] DELETE_SUCCESS';
const SELECT = '[Task] SELECT';
const SELECT_SUCCESS = '[Task] SELECT_SUCCESS';
const CLEAR_SELECTED = '[Task] CLEAR_SELECTED';

export const loadTasks = createAction(
  LOAD
);

export const loadTasksSuccess = createAction(
  LOAD_SUCCESS,
  props<{tasks: Task[]}>()
);

export const createTask = createAction(
  CREATE,
  props<{task: Task}>()
);

export const createTaskSuccess = createAction(
  CREATE_SUCCESS,
  props<{task: Task}>()
);

export const updateTask = createAction(
  UPDATE,
  props<{task: Task}>()
);

export const updateTaskSuccess = createAction(
  UPDATE_SUCCESS,
  props<{task: Task}>()
);

export const deleteTask = createAction(
  DELETE,
  props<{taskId: string}>()
);

export const deleteTaskSuccess = createAction(
  DELETE_SUCCESS,
  props<{taskId: string}>()
);

export const selectTask = createAction(
  SELECT,
  props<{taskId: string}>()
);

export const selectTaskSuccess = createAction(
  SELECT_SUCCESS,
  props<{task: Task}>()
);

export const clearSelectedTask = createAction(
  CLEAR_SELECTED
);



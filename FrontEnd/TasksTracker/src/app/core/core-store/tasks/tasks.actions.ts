import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task';

const LOAD = '[Tasks] LOAD';
const LOAD_SUCCESS = '[Tasks] LOAD_SUCCESS';
const LOAD_ALL = '[Tasks] LOAD_ALL';
const LOAD_ALL_SUCCESS = '[Tasks] LOAD_ALL_SUCCESS';
const LOAD_TODAY = '[Tasks] LOAD_TODAY';
const LOAD_TODAY_SUCCESS = '[Tasks] LOAD_TODAY_SUCCESS';
const LOAD_WEEK = '[Tasks] LOAD_WEEK';
const LOAD_WEEK_SUCCESS = '[Tasks] LOAD_WEEK_SUCCESS';
const LOAD_COMPLETED = '[Tasks] LOAD_COMPLETED';
const LOAD_COMPLETED_SUCCESS = '[Tasks] LOAD_COMPLETED_SUCCESS';
const LOAD_TRASH = '[Tasks] LOAD_TRASH';
const LOAD_TRASH_SUCCESS = '[Tasks] LOAD_TRASH_SUCCESS';

const CREATE = '[Task] CREATE';
const CREATE_SUCCESS = '[Task] CREATE_SUCCESS';
const UPDATE = '[Task] UPDATE';
const UPDATE_SUCCESS = '[Task] UPDATE_SUCCESS';
const DELETE = '[Task] DELETE';
const DELETE_SUCCESS = '[Task] DELETE_SUCCESS';
const LOAD_SELECTED = '[Task] LOAD_SELECTED';
const LOAD_SELECTED_SUCCESS = '[Task] SELECT_SUCCESS';
const CLEAR_SELECTED = '[Task] CLEAR_SELECTED';
const PATCH = '[Task] PATCH';
const PATCH_SUCCESS = '[Task] PATCH_SUCCESS';

export const loadTasks = createAction(
  LOAD
);

export const loadTasksSuccess = createAction(
  LOAD_SUCCESS,
  props<{tasks: Task[]}>()
);

export const loadAllTasks = createAction(
  LOAD_ALL
);

export const loadAllTasksSuccess = createAction(
  LOAD_ALL_SUCCESS,
  props<{tasks: Task[]}>()
);

export const loadTodayTasks = createAction(
  LOAD_TODAY
);

export const loadTodayTasksSuccess = createAction(
  LOAD_TODAY_SUCCESS,
  props<{tasks: Task[]}>()
);

export const loadWeekTasks = createAction(
  LOAD_WEEK
);

export const loadWeekTasksSuccess = createAction(
  LOAD_WEEK_SUCCESS,
  props<{tasks: Task[]}>()
);

export const loadCompletedTasks = createAction(
  LOAD_COMPLETED
);

export const loadCompletedTasksSuccess = createAction(
  LOAD_COMPLETED_SUCCESS,
  props<{tasks: Task[]}>()
);

export const loadTrashTasks = createAction(
  LOAD_TRASH
);

export const loadTrashTasksSuccess = createAction(
  LOAD_TRASH_SUCCESS,
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

export const loadTask = createAction(
  LOAD_SELECTED,
  props<{taskId: string}>()
);

export const loadTaskSuccess = createAction(
  LOAD_SELECTED_SUCCESS,
  props<{task: Task}>()
);

export const clearSelectedTask = createAction(
  CLEAR_SELECTED
);

export const patchTask = createAction(
  PATCH,
  props<{ taskId: string, patchDocument: { [key: string]: any } }>()
);

export const patchTaskSuccess = createAction(
  PATCH_SUCCESS,
  props<{ task: Task }>()
);



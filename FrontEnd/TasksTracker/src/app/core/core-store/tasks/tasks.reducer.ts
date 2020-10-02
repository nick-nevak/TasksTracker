import { Action, createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../../models/task';

export interface TasksState extends EntityState<Task> {
  selectedTask: Task;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: (a: Task, b: Task) => a.id < b.id ? 1 : -1,
});

const initialState: TasksState = tasksAdapter.getInitialState({
  areTasksLoaded: false,
  // TODO: consider to move to separated state for form
  selectedTask: null
});

const reducer = createReducer(
  initialState,
  on(
    TasksActions.loadTasksSuccess,
    TasksActions.loadAllTasksSuccess,
    TasksActions.loadTodayTasksSuccess,
    TasksActions.loadWeekTasksSuccess,
    TasksActions.loadCompletedTasksSuccess,
    TasksActions.loadTrashTasksSuccess,
    (state, { tasks }) => {
      const clearedState = tasksAdapter.removeAll(state);
      return tasksAdapter.addMany(tasks, clearedState);
    }
  ),
  on(TasksActions.createTaskSuccess, (state, { task }) => {
    return tasksAdapter.addOne(task, state);
  }),
  on(TasksActions.updateTaskSuccess, (state, { task }) => {
    return tasksAdapter.setOne(task, state);
  }),
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => {
    return tasksAdapter.removeOne(taskId, state);
  }),
  on(TasksActions.loadTaskSuccess, (state, { task }) => {
    return { ...state, selectedTask: task };
  }),
  on(TasksActions.clearSelectedTask, (state) => {
    return { ...state, selectedTask: null };
  }),
  on(TasksActions.patchTaskSuccess, (state, { task }) => {
    return tasksAdapter.setOne(task, state);
  })
);

export function tasksReducer(state: TasksState | undefined = initialState, action: Action): TasksState {
  return reducer(state, action);
}


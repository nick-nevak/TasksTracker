import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { TasksHttpService } from '../../services/tasks-http.service';
import {
  loadTasks, loadTasksSuccess, createTask, createTaskSuccess, updateTask, updateTaskSuccess, deleteTask, deleteTaskSuccess,
  loadTaskSuccess, loadTask, clearSelectedTask, patchTask, patchTaskSuccess, loadAllTasks, loadTodayTasks, loadWeekTasks, loadCompletedTasks, loadTrashTasks
} from './tasks.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../core-store.module';
import { Store } from '@ngrx/store';
import { selectUrl, selectRouteParams } from '../router/router.selectors';


@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private tasksHttpService: TasksHttpService,
    private router: Router,
    private store: Store<AppState>) { }

  @Effect()
  loadAllTasks$ = this.actions$
    .pipe(
      ofType(loadAllTasks),
      switchMap(() => {
        return this.tasksHttpService.getTasks({});
      }),
      map(loadedTasks => loadTasksSuccess({ tasks: loadedTasks }))
    );

  @Effect()
  loadTodayTasks$ = this.actions$
    .pipe(
      ofType(loadTodayTasks),
      switchMap(() => {
        const fromDate = new Date();
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date();
        toDate.setHours(0, 0, 0, 0);
        toDate.setDate(fromDate.getDate() + 1);
        return this.tasksHttpService.getTasks({ includePriority: false, fromDate, toDate });
      }),
      map(loadedTasks => loadTasksSuccess({ tasks: loadedTasks }))
    );

  @Effect()
  loadWeekTasks$ = this.actions$
    .pipe(
      ofType(loadWeekTasks),
      switchMap(() => {
        const fromDate = new Date();
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date();
        toDate.setHours(0, 0, 0, 0);
        toDate.setDate(fromDate.getDate() + 7);
        return this.tasksHttpService.getTasks({ includePriority: false, fromDate, toDate });
      }),
      map(loadedTasks => loadTasksSuccess({ tasks: loadedTasks }))
    );

  @Effect()
  loadCompletedTasks$ = this.actions$
    .pipe(
      ofType(loadCompletedTasks),
      switchMap(() => {
        return this.tasksHttpService.getTasks({ filterByStatus: true });
      }),
      map(loadedTasks => loadTasksSuccess({ tasks: loadedTasks }))
    );

  @Effect()
  loadTrashTasks$ = this.actions$
    .pipe(
      ofType(loadTrashTasks),
      switchMap(() => {
        return this.tasksHttpService.getTasks({ filterByDeleted: true });
      }),
      map(loadedTasks => loadTasksSuccess({ tasks: loadedTasks }))
    );

  @Effect()
  createTask$ = this.actions$
    .pipe(
      ofType(createTask),
      switchMap(({ task }) => this.tasksHttpService.createTask(task)),
      map(createdTask => createTaskSuccess({ task: createdTask }))
    );

  @Effect({ dispatch: false })
  createTaskSuccess$ = this.actions$
    .pipe(
      ofType(createTaskSuccess),
      withLatestFrom(this.store.select(selectUrl), this.store.select(selectRouteParams)),
      tap(([{ task }, currentUrl, routeParams]) => {
        const isTaskAlreadySelected = !!routeParams.id;
        // TODO use selected task from state
        const urlToNavigate = isTaskAlreadySelected
          ? currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1) + task._id
          : `${currentUrl}/${task._id}`;
        this.router.navigateByUrl(urlToNavigate);
      }),
      // tap(({ task }) => this.router.navigate(['./', task._id], { relativeTo: this.activatedRoute }))
    );

  @Effect()
  updateTask$ = this.actions$
    .pipe(
      ofType(updateTask),
      switchMap(({ task }) => this.tasksHttpService.updateTask(task)),
      map(updatedTask => updateTaskSuccess({ task: updatedTask }))
    );

  @Effect()
  updateTaskSuccess$ = this.actions$
    .pipe(
      ofType(updateTaskSuccess),
      tap(_ => this.router.navigate(['/'])),
      map(_ => clearSelectedTask())
    );

  @Effect()
  deleteTask$ = this.actions$
    .pipe(
      ofType(deleteTask),
      switchMap(({ taskId }) => this.tasksHttpService.deleteTask(taskId)),
      map(deletedTask => deleteTaskSuccess({ taskId: deletedTask }))
    );

  @Effect({ dispatch: false })
  deleteTaskSuccess$ = this.actions$
    .pipe(
      ofType(deleteTaskSuccess),
      withLatestFrom(this.store.select(selectUrl)),
      tap(([, currentUrl]) => {
        const urlToNavigate = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
        this.router.navigateByUrl(urlToNavigate);
      }),
      // tap(_ => this.router.navigate(['../'], { relativeTo: this.activatedRoute }))
    );

  @Effect()
  loadTask$ = this.actions$
    .pipe(
      ofType(loadTask),
      switchMap(({ taskId }) => this.tasksHttpService.getTask(taskId)),
      map(task => loadTaskSuccess({ task }))
    );

  @Effect()
  patchTask$ = this.actions$
    .pipe(
      ofType(patchTask),
      switchMap(({ taskId, patchDocument }) => this.tasksHttpService.patchTask(taskId, patchDocument)),
      map(updatedTask => patchTaskSuccess({ task: updatedTask }))
    );

}

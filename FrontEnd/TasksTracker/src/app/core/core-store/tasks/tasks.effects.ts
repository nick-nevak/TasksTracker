import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, tap, map, withLatestFrom, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../core-store.module';
import { TasksHttpService } from '../../../tasks/services/tasks-http.service';
import { loadTasks, loadTasksSuccess, createTask, createTaskSuccess, updateTask, updateTaskSuccess, deleteTask, deleteTaskSuccess } from './tasks.actions';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class TasksEffects {

  constructor(private actions$: Actions,
              private tasksHttpService: TasksHttpService,
              private router: Router,
              private activetedRoute: ActivatedRoute) { }

  @Effect()
  loadTasks$ = this.actions$
    .pipe(
      ofType(loadTasks),
      switchMap(() => this.tasksHttpService.getTasks()),
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
      tap(_ => this.router.navigate(['/']))
    );

  @Effect()
  updateTask$ = this.actions$
    .pipe(
      ofType(updateTask),
      switchMap(({ task }) => this.tasksHttpService.updateTask(task)),
      map(updatedTask => updateTaskSuccess({ task: updatedTask }))
    );

  @Effect({ dispatch: false })
  updateTaskSuccess$ = this.actions$
    .pipe(
      ofType(updateTaskSuccess),
      tap(_ => this.router.navigate(['/']))
    );

  @Effect()
  deleteTask$ = this.actions$
    .pipe(
      ofType(deleteTask),
      switchMap(({ taskId }) => this.tasksHttpService.deleteTask(taskId)),
      map(deletedTask => deleteTaskSuccess({ taskId: deletedTask }))
    );


}

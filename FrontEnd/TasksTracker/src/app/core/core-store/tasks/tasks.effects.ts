import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, switchMap } from 'rxjs/operators';
import { TasksHttpService } from '../../services/tasks-http.service';
import { loadTasks, loadTasksSuccess, createTask, createTaskSuccess, updateTask, updateTaskSuccess, deleteTask, deleteTaskSuccess,
         loadTaskSuccess, loadTask, clearSelectedTask, patchTask, patchTaskSuccess } from './tasks.actions';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private tasksHttpService: TasksHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  @Effect()
  loadTasks$ = this.actions$
    .pipe(
      ofType(loadTasks),
      switchMap(() => this.tasksHttpService.getTasks({ includePriority: false })),
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
      tap(({ task }) => {
        this.router.navigate(['/tasks/today/', task._id ]);
      })
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
      tap(_ => this.router.navigate(['/tasks/today']))
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksHttpService } from '../services/tasks-http.service';
import { BaseDestroyableComponent } from '../../core/base-classes/base-destroyable';
import { takeUntil, tap } from 'rxjs/operators';
import { Task } from '../models/task';
import { AppState } from '../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { loadTasksSuccess, deleteTaskSuccess, loadTasks, deleteTask } from '../../core/core-store/tasks/tasks.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent extends BaseDestroyableComponent implements OnInit, OnDestroy {

  tasks$: Observable<Task[]>;

  constructor(private store: Store<AppState>,
              private tasksHttpService: TasksHttpService) {
    super();
  }

  ngOnInit(): void {
    this.tasks$ = this.store.select(s => s.tasksState.tasks);
    this.trackTasksLoadedStatus();
  }

  delete(task: Task): void {
    // this.tasksHttpService.deleteTask(task._id)
    //   .pipe(
    //     tap(_ => this.store.dispatch(deleteTaskSuccess({ taskId: task._id })))
    //   ).subscribe();

    this.store.dispatch(deleteTask({ taskId: task._id }));
  }

  private trackTasksLoadedStatus(): void {
    this.store.select(s => s.tasksState.areTasksLoaded)
      .pipe(
        tap(areLoaded => !areLoaded ? this.store.dispatch(loadTasks()) : undefined),
        takeUntil(this.componentAlive$)
      ).subscribe();
  }

}

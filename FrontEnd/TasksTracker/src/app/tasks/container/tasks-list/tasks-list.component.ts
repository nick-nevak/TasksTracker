import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseDestroyableComponent } from '../../../core/base-classes/base-destroyable';
import { takeUntil, tap } from 'rxjs/operators';
import { AppState } from '../../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { loadTasksSuccess, deleteTaskSuccess, loadTasks, deleteTask, selectTask } from '../../../core/core-store/tasks/tasks.actions';
import { selectTasks, selectAreTasksLoaded } from '../../../core/core-store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent extends BaseDestroyableComponent implements OnInit, OnDestroy {

  tasks$: Observable<Task[]> = this.store.select(selectTasks);

  constructor(private store: Store<AppState>,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.trackTasksLoadedStatus();
  }

  onTaskEdited(task: Task): void {
    this.store.dispatch(selectTask({ taskId: task._id }));
    this.router.navigate(['./edit', `${task._id}`]);
  }

  onTaskDeleted(task: Task): void {
    this.store.dispatch(deleteTask({ taskId: task._id }));
  }

  private trackTasksLoadedStatus(): void {
    this.store.select(selectAreTasksLoaded)
      .pipe(
        tap(areLoaded => !areLoaded ? this.store.dispatch(loadTasks()) : undefined),
        takeUntil(this.componentAlive$)
      ).subscribe();
  }

}

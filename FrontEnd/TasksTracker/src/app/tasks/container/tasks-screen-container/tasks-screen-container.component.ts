import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BaseDestroyableComponent } from '../../../core/base-classes/base-destroyable';
import { AppState } from '../../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { deleteTask, patchTask, createTask, loadWeekTasks, loadTodayTasks, loadCompletedTasks, loadTrashTasks, loadAllTasks } from '../../../core/core-store/tasks/tasks.actions';
import { selectTasks, selectSelectedTask } from '../../../core/core-store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';
import { selectPrioritiesDictionary } from 'src/app/core/core-store/priorities/priorities.selectors';
import { Dictionary } from '@ngrx/entity';
import { loadPriorities } from 'src/app/core/core-store/priorities/priorities.actions';
import { tap, filter, map, takeUntil } from 'rxjs/operators';
import { TasksFilter } from 'src/app/core/models/enums/tasks-filter';

@Component({
  selector: 'app-tasks-screen-container',
  templateUrl: './tasks-screen-container.component.html',
  styleUrls: ['./tasks-screen-container.component.scss']
})
export class TasksScreenContainerComponent extends BaseDestroyableComponent implements OnInit, OnDestroy {

  tasks$: Observable<Task[]> = this.store.select(selectTasks);
  priorities$: Observable<Dictionary<Priority>> = this.store.select(selectPrioritiesDictionary);
  selectedTask$: Observable<Task> = this.store.select(selectSelectedTask);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.trackUrlChangesAndLoadTasks();
    this.store.dispatch(loadPriorities());
  }

  onTaskCreated(task: Task): void {
    this.store.dispatch(createTask({ task }));
  }

  onTaskStatusUpdated(event: { task: Task, updatedStatus: boolean }): void {
    const { task, updatedStatus } = event;
    const patchDocument = { status: updatedStatus };
    this.store.dispatch(patchTask({ taskId: task.id, patchDocument }));
  }

  onTaskSelected(task: Task): void {
    this.router.navigate(['./', task.id], { relativeTo: this.activatedRoute });
  }

  onTaskDeleted(task: Task): void {
    this.store.dispatch(deleteTask({ taskId: task.id }));
  }

  private trackUrlChangesAndLoadTasks(): void {
    this.activatedRoute.url
      .pipe(
        filter(urlSegments => !!urlSegments?.length),
        map(urlSegments => urlSegments[0].path),
        tap(currentPath => this.loadTasksAccordingToCurrentPath(currentPath)),
        takeUntil(this.componentAlive$)
      ).subscribe();
  }

  private loadTasksAccordingToCurrentPath(path: string): void {
    switch (path) {
      case TasksFilter.All:
        this.store.dispatch(loadAllTasks());
        break;
      case TasksFilter.Week:
        this.store.dispatch(loadWeekTasks());
        break;
      case TasksFilter.Today:
        this.store.dispatch(loadTodayTasks());
        break;
      case TasksFilter.Completed:
        this.store.dispatch(loadCompletedTasks());
        break;
      case TasksFilter.Trash:
        this.store.dispatch(loadTrashTasks());
        break;
    }
  }

}

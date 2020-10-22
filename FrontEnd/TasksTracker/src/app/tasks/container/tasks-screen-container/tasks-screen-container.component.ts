import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseDestroyableComponent } from '../../../core/base-classes/base-destroyable';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';
import { tap, filter, map, takeUntil } from 'rxjs/operators';
import { TasksFilter } from 'src/app/core/models/enums/tasks-filter';
import { TaskQuery } from '../../state/taks/task.query';
import { PriorityQuery } from '../../state/priority/priority.query';
import { PrioritiesService } from '../../services/priorities.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks-screen-container',
  templateUrl: './tasks-screen-container.component.html',
  styleUrls: ['./tasks-screen-container.component.scss']
})
export class TasksScreenContainerComponent extends BaseDestroyableComponent implements OnInit, OnDestroy {

  tasks$: Observable<Task[]> = this.taskQuery.tasks$;
  priorities$: Observable<Map<string, Priority>> = this.prioritiesQuery.dictionary$;
  selectedTask$: Observable<Task> = this.taskQuery.selected$;

  constructor(
    private taskQuery: TaskQuery,
    private tasksService: TasksService,
    private prioritiesQuery: PriorityQuery,
    private prioritiesService: PrioritiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.trackUrlChangesAndLoadTasks();
    this.prioritiesService.getPriorities().subscribe();
  }

  onTaskCreated(task: Task): void {
    this.tasksService.createTask(task).subscribe();
  }

  onTaskStatusUpdated(event: { task: Task, updatedStatus: boolean }): void {
    const { task, updatedStatus } = event;
    const patchDocument = { status: updatedStatus };
    this.tasksService.patchTask(task._id, patchDocument);
  }

  onTaskSelected(task: Task): void {
    this.router.navigate(['./', task._id], { relativeTo: this.activatedRoute });
  }

  onTaskDeleted(task: Task): void {
    this.tasksService.deleteTask(task._id);
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
        this.tasksService.getTasks({}).subscribe();
        break;
      case TasksFilter.Week:
        // this.store.dispatch(loadWeekTasks());
        break;
      case TasksFilter.Today:
        // this.store.dispatch(loadTodayTasks());
        break;
      case TasksFilter.Completed:
        // this.store.dispatch(loadCompletedTasks());
        break;
      case TasksFilter.Trash:
        // this.store.dispatch(loadTrashTasks());
        break;
    }
  }

}

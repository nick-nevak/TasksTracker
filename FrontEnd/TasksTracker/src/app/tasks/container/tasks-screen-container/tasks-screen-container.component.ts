import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BaseDestroyableComponent } from '../../../core/base-classes/base-destroyable';
import { AppState } from '../../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { loadTasks, deleteTask, patchTask } from '../../../core/core-store/tasks/tasks.actions';
import { selectTasks, selectSelectedTask } from '../../../core/core-store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';
import { selectPrioritiesDictionary } from 'src/app/core/core-store/priorities/priorities.selectors';
import { Dictionary } from '@ngrx/entity';
import { loadPriorities } from 'src/app/core/core-store/priorities/priorities.actions';

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
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadPriorities());
  }

  onTaskCreated(): void {
    this.router.navigate(['/tasks/create']);
  }

  onTaskStatusUpdated(event: { task: Task, updatedStatus: boolean }): void {
    const { task, updatedStatus } = event;
    const patchDocument = { status: updatedStatus };
    this.store.dispatch(patchTask({ taskId: task._id, patchDocument }));
  }

  onTaskSelected(task: Task): void {
    this.router.navigate(['/tasks', `${task._id}`]);
  }

  onTaskDeleted(task: Task): void {
    this.store.dispatch(deleteTask({ taskId: task._id }));
  }

}

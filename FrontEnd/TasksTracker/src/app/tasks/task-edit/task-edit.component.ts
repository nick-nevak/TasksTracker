import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../models/task';
import { takeUntil, tap, catchError, filter } from 'rxjs/operators';
import { BaseDestroyableComponent } from 'src/app/core/base-classes/base-destroyable';
import { of } from 'rxjs';
import { TasksHttpService } from '../services/tasks-http.service';
import { AppState } from '../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { createTaskSuccess, updateTaskSuccess, createTask, updateTask, selectTask } from '../../core/core-store/tasks/tasks.actions';
import { selectSelectedTask } from '../../core/core-store/tasks/tasks.selectors';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent extends BaseDestroyableComponent implements OnInit {

  task: Task;
  taskId: string;

  constructor(private store: Store<AppState>,
              private tasksHttpService: TasksHttpService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormModel();
    this.trackTaskId();
  }

  save(task: Task): void {
    this.taskId ? this.updateTask(task) : this.createTask(task);
  }

  private initializeFormModel(): void {
    this.task = {
      title: '',
      description: '',
      source: ''
    } as Task;
  }

  private getTask(taskId: string): void {
    // this.tasksHttpService.getTask(taskId)
    //   .pipe(
    //     tap(task => this.task = task)
    //   ).subscribe();
    this.store.dispatch(selectTask({ taskId }));
    this.store.select(selectSelectedTask)
      .pipe(
        filter(task => !!task),
        tap(task => this.task = task),
        takeUntil(this.componentAlive$)
      ).subscribe();
  }

  private createTask(task: Task): void {
    this.store.dispatch(createTask({ task }));
  }

  private updateTask(task: Task): void {
    this.store.dispatch(updateTask({ task }));
  }

  private trackTaskId(): void {
    this.activatedRoute.paramMap.pipe(
      tap(paramMap => {
        this.taskId = paramMap.get('id');
        this.taskId ? this.getTask(this.taskId) : undefined;
      }),
      takeUntil(this.componentAlive$)
    ).subscribe();
  }

}

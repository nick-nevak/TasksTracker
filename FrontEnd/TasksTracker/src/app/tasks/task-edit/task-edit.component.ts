import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../models/task';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { BaseDestroyableComponent } from 'src/app/core/base-classes/base-destroyable';
import { of } from 'rxjs';
import { TasksHttpService } from '../services/tasks-http.service';
import { AppState } from '../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { createTaskSuccess, updateTaskSuccess, createTask, updateTask } from '../../core/core-store/tasks/tasks.actions';

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
    this.activatedRoute.paramMap.pipe(
      tap(paramMap => {
        this.taskId = paramMap.get('id');
        if (this.taskId) {
          this.getTask(this.taskId);
        }
      }),
      takeUntil(this.componentAlive$)
    ).subscribe();
    this.initializeFormModel();
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
    this.tasksHttpService.getTask(taskId)
      .pipe(
        tap(task => this.task = task)
      ).subscribe();
  }

  private createTask(task: Task): void {
    this.store.dispatch(createTask({ task }));
  }

  private updateTask(task: Task): void {
    this.store.dispatch(updateTask({ task }));
  }

}

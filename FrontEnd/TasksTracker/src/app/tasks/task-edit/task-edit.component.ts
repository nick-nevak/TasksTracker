import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../models/task';
import { takeUntil, tap, catchError, filter } from 'rxjs/operators';
import { BaseDestroyableComponent } from 'src/app/core/base-classes/base-destroyable';
import { of, from } from 'rxjs';
import { TasksHttpService } from '../services/tasks-http.service';
import { AppState } from '../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { createTaskSuccess, updateTaskSuccess, createTask, updateTask, selectTask } from '../../core/core-store/tasks/tasks.actions';
import { selectSelectedTask } from '../../core/core-store/tasks/tasks.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent extends BaseDestroyableComponent implements OnInit {

  taskForm: FormGroup;
  taskId: string;

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.trackTaskId();
    this.trackSelectedTask();
  }

  onSubmit(): void {
    const task: Task = this.taskForm.value;
    if (this.taskId) {
      task._id = this.taskId;
      this.updateTask(task);
    } else {
      this.createTask(task);
    }
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: '',
      description: '',
      source: ''
    });
  }

  private getTask(taskId: string): void {
    this.store.dispatch(selectTask({ taskId }));
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

  private trackSelectedTask(): void {
    this.store.select(selectSelectedTask)
      .pipe(
        filter(task => !!task),
        tap(task => this.taskForm.patchValue(task)),
        takeUntil(this.componentAlive$)
      ).subscribe();
  }

}

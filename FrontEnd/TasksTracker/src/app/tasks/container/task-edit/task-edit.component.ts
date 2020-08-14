import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';
import { takeUntil, tap, catchError, filter } from 'rxjs/operators';
import { BaseDestroyableComponent } from 'src/app/core/base-classes/base-destroyable';
import { AppState } from '../../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { createTaskSuccess, updateTaskSuccess, createTask, updateTask, selectTask, clearSelectedTask } from '../../../core/core-store/tasks/tasks.actions';
import { selectSelectedTask } from '../../../core/core-store/tasks/tasks.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent extends BaseDestroyableComponent implements OnInit {

  task$: Observable<Task> = this.store.select(selectSelectedTask);
  taskId: string;

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.trackTaskId();
  }

  onFormSubmitted(formValue): void {
    if (this.taskId) {
      formValue._id = this.taskId;
      this.updateTask(formValue);
    } else {
      this.createTask(formValue);
    }
  }

  onFormCancelled(): void {
    this.store.dispatch(clearSelectedTask());
    this.router.navigate(['../']);
  }

  private trackTaskId(): void {
    this.activatedRoute.paramMap.pipe(
      tap(paramMap => {
        this.taskId = paramMap.get('id');
      }),
      takeUntil(this.componentAlive$)
    ).subscribe();
  }

  private createTask(task: Task): void {
    this.store.dispatch(createTask({ task }));
  }

  private updateTask(task: Task): void {
    this.store.dispatch(updateTask({ task }));
  }

}

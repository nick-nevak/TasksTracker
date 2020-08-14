import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../models/task';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditFormComponent implements OnChanges {

  @Input()
  task: Task;

  @Output()
  formSubmitted = new EventEmitter<Task>();

  @Output()
  formCancelled = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task.firstChange) {
      this.createForm();
    }
    const taskValue = changes.task.currentValue;
    taskValue ? this.taskForm.patchValue(taskValue) : undefined;
  }

  submit(): void {
    this.formSubmitted.next(this.taskForm.value);
  }

  cancelChanges(): void {
    this.formCancelled.next();
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: '',
      description: '',
      source: ''
    });
  }

}

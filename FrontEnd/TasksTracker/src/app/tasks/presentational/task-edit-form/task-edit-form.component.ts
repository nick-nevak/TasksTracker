import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditFormComponent implements OnChanges {

  @Input()
  task: Task;

  @Input()
  priorities: Priority[];

  @Output()
  formSubmitted = new EventEmitter<Task>();

  @Output()
  formCancelled = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task?.firstChange) {
      this.createForm();
    }
    if (changes.task?.currentValue) {
      this.taskForm.patchValue(changes.task.currentValue);
    }
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
      source: '',
      priority: ''
    });
  }

}

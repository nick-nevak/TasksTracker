import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';
import { distinctUntilChanged, debounceTime, tap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { BaseDestroyableComponent } from 'src/app/core/base-classes/base-destroyable';
import { pipe, of } from 'rxjs';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditFormComponent extends BaseDestroyableComponent implements OnChanges {

  @Input()
  task: Task;

  @Input()
  priorities: Priority[];

  @Input()
  isInEditMode: boolean;

  @Output()
  fieldUpdated = new EventEmitter<{[key: string]: string}>();

  @Output()
  formSubmitted = new EventEmitter<Task>();


  taskForm: FormGroup;


  // TODO: move to directive
  private getPipeForFormControl(fieldName: string) {
    return pipe(
      withLatestFrom(of(fieldName)),
      distinctUntilChanged(),
      debounceTime(500),
      tap(([value, key]) => this.fieldUpdated.next({ [key]: (value as string) })),
      takeUntil(this.componentAlive$));
  }

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task?.firstChange) {
      this.createForm();
    }
    if (changes.task?.currentValue) {
      this.taskForm.patchValue(changes.task.currentValue, { emitEvent: false });
    }
  }

  submit(): void {
    this.formSubmitted.next(this.taskForm.value);
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: '',
      description: '',
      source: '',
      priority: ''
    });
    if (this.isInEditMode) {
      this.trackFieldsChanges();
    }
  }

  // TODO: move to directive
  private trackFieldsChanges(): void {
    Object.keys(this.taskForm.controls)
      .forEach(formControlName => {
        this.taskForm.get(formControlName).valueChanges
          .pipe(this.getPipeForFormControl(formControlName))
          .subscribe();
      });
  }

}

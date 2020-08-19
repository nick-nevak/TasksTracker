import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/core/models/task';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.scss']
})
export class TaskCreatorComponent implements OnInit {

  @Output() taskCeated = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  submit(): void {
    if (!this.taskForm.get('title').value){
      return;
    }
    this.taskCeated.next(this.taskForm.value);
    this.createForm();
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: '',
      status: '',
      dueDate: '',
      description: '',
      priority: ''
    });
    this.taskForm.get('status').patchValue(false, { emitEvent: false });
  }

}

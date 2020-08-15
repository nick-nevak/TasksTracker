import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTableComponent implements OnInit {

  @Input()
  tasks: Task;

  @Output()
  taskEdited = new EventEmitter<Task>();

  @Output()
  taskDeleted = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

  edit(task: Task): void {
    this.taskEdited.next(task);
  }

  delete(task: Task): void {
    this.taskDeleted.next(task);
  }

}

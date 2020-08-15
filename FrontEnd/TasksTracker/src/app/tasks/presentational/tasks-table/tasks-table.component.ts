import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTableComponent {

  @Input()
  tasks: Task;

  @Output()
  taskStatusUpdated = new EventEmitter<{task: Task, updatedStatus: boolean}>();

  @Output()
  taskEdited = new EventEmitter<Task>();

  @Output()
  taskDeleted = new EventEmitter<Task>();

  updateStatus(task: Task, updatedStatus): void {
    this.taskStatusUpdated.next({task, updatedStatus});
  }

  edit(task: Task): void {
    this.taskEdited.next(task);
  }

  delete(task: Task): void {
    this.taskDeleted.next(task);
  }

}

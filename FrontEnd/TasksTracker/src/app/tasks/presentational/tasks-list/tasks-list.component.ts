import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {

  @Input() tasks: Task;
  @Input() priorities: Dictionary<Priority>;
  @Input() selectedTask: Task;

  @Output() taskStatusUpdated = new EventEmitter<{task: Task, updatedStatus: boolean}>();
  @Output() taskSelected = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();

  updateStatus(task: Task, updatedStatus): void {
    this.taskStatusUpdated.next({task, updatedStatus});
  }

  select(task: Task): void {
    this.taskSelected.next(task);
  }

  delete(task: Task): void {
    this.taskDeleted.next(task);
  }

  getPriority(priorityId: string): Priority {
    return this.priorities && this.priorities[priorityId];
  }

}

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseDestroyableComponent } from '../../../core/base-classes/base-destroyable';
import { AppState } from '../../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { loadTasks, deleteTask, patchTask } from '../../../core/core-store/tasks/tasks.actions';
import { selectTasks, selectSelectedTask } from '../../../core/core-store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';
import { selectPrioritiesDictionary } from 'src/app/core/core-store/priorities/priorities.selectors';
import { Dictionary } from '@ngrx/entity';
import { loadPriorities } from 'src/app/core/core-store/priorities/priorities.actions';

@Component({
  selector: 'app-tasks-screen',
  templateUrl: './tasks-screen.component.html',
  styleUrls: ['./tasks-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksScreenComponent implements AfterViewInit {

  @Input() tasks: Task;
  @Input() priorities: Dictionary<Priority>;
  @Input() selectedTask: Task;

  @Output() taskStatusUpdated = new EventEmitter<{task: Task, updatedStatus: boolean}>();
  @Output() taskSelected = new EventEmitter<Task>();
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();

  @ViewChild('stickyHeader') stickyHeader: ElementRef;
  @ViewChild('scrollableContent') scrollableContent: ElementRef;

  ngAfterViewInit(): void {
    this.calculateViewPortHeight();
  }

  onTaskCreated(): void{
    this.taskCreated.next();
  }

  onTaskStatusUpdated(event: { task: Task, updatedStatus: boolean }): void {
    this.taskStatusUpdated.next(event);
  }

  onTaskSelected(task: Task): void {
    this.taskSelected.next(task);
  }

  onTaskDeleted(task: Task): void {
    this.taskDeleted.next(task);
  }

  private calculateViewPortHeight(): void {
    const documentHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const stickyHeader = (this.stickyHeader.nativeElement as HTMLDivElement);
    const scrollableContent = (this.scrollableContent.nativeElement as HTMLDivElement);
    scrollableContent.style.height = documentHeight - stickyHeader.offsetHeight + 'px';
  }

}

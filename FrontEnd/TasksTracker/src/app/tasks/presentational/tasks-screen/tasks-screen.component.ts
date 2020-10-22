import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';
import { Dictionary } from '@ngrx/entity';

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

  onTaskCreated(task: Task): void{
    this.taskCreated.next(task);
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

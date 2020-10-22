import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { BaseDestroyableComponent } from 'src/app/core/base-classes/base-destroyable';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/models/task';
import { Priority } from 'src/app/core/models/priority';
import { TaskQuery } from '../../state/taks/task.query';
import { TasksService } from '../../services/tasks.service';
import { PriorityQuery } from '../../state/priority/priority.query';
import { PrioritiesService } from '../../services/priorities.service';
import { TaskStore } from '../../state/taks/task.store';

@Component({
  selector: 'app-task-edit-container',
  templateUrl: './task-edit-container.component.html',
  styleUrls: ['./task-edit-container.component.scss']
})
export class TaskEditContainerComponent extends BaseDestroyableComponent implements OnInit, OnDestroy {

  task$: Observable<Task> = this.taskQuery.selected$;
  priorities$: Observable<Priority[]> = this.prioritiesQuery.all$;
  taskId: string;

  constructor(private taskQuery: TaskQuery,
              private tasksService: TasksService,
              private prioritiesQuery: PriorityQuery,
              private prioritiesService: PrioritiesService,
              private activatedRoute: ActivatedRoute,
              private taskStore: TaskStore) {
    super();
  }

  ngOnInit(): void {
    this.trackTaskId();
    this.getPriorities();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.taskStore.update({ selectedTask: null });
  }

  onFieldUpdated(changes: { [key: string]: any }): void {
    console.log('field update:', changes);
    this.tasksService.patchTask(this.taskId, changes).subscribe();
  }

  onFormSubmitted(formValue): void {
    if (this.taskId) {
      formValue._id = this.taskId;
      this.updateTask(formValue);
    } else {
      this.createTask(formValue);
    }
  }

  // No need for now
  // backClicked(): void {
  //   this.store.dispatch(clearSelectedTask());
  //   this.router.navigate(['../']);
  // }

  private trackTaskId(): void {
    this.activatedRoute.paramMap.pipe(
      tap(paramMap => {
        this.taskId = paramMap.get('id');
        this.taskId ? this.getTask(this.taskId) : undefined;
      }),
      takeUntil(this.componentAlive$)
    ).subscribe();
  }

  private getPriorities(): void {
    this.prioritiesService.getPriorities().subscribe();
  }

  private getTask(taskId: string): void {
    this.tasksService.getTask(taskId).subscribe();
  }

  private createTask(task: Task): void {
    this.tasksService.createTask(task);
  }

  private updateTask(task: Task): void {
    this.tasksService.updateTask(task);
  }

}

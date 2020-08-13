import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksHttpService } from '../services/tasks-http.service';
import { BaseDestroyableComponent } from '../../core/base-classes/base-destroyable';
import { takeUntil, tap } from 'rxjs/operators';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent extends BaseDestroyableComponent implements OnInit, OnDestroy {

  tasks: Task[];

  constructor(private tasksHttpService: TasksHttpService) {
    super();
  }

  ngOnInit(): void {
    this.tasksHttpService.getTasks()
      .pipe(
        tap(tasks => this.tasks = tasks)
      ).subscribe();
  }

  delete(task: Task) {
    this.tasksHttpService.deleteTask(task._id)
      .pipe(
        tap(_ => this.tasks = this.tasks.filter(i => i._id !== task._id))
      ).subscribe();
  }

}

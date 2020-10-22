import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Task } from '../../../core/models/task';
import { TaskState, TaskStore } from './task.store';

@Injectable({ providedIn: 'root' })
export class TaskQuery extends QueryEntity<TaskState> {

  tasks$: Observable<Task[]> = this.selectAll();
  selected$: Observable<Task> = this.select(store => store.selectedTask);

  constructor(protected store: TaskStore) {
    super(store);
  }
}

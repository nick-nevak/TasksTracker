import { Injectable } from '@angular/core';
import { Store, StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Task } from '../../../core/models/task';

export interface TaskState extends EntityState<Task, string> {
  selectedTask: Task;
}

const createInitialState = () => ({ selectedTask: null });

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'task', idKey: '_id' })
export class TaskStore extends EntityStore<TaskState> {
  constructor() {
    super(createInitialState());
  }
}

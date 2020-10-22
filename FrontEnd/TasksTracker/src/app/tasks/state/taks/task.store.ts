import { Store, StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Task } from '../../../core/models/task';

export interface TaskState extends EntityState<Task, string> {
  selectedTask: Task;
}

const createInitialState = () => ({ selectedTask: null });

@StoreConfig({ name: 'task', idKey: '_id' })
export class TaskStore extends Store<TaskState> {
  constructor() {
    super(createInitialState());
  }
}

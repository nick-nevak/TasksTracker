import { Priority } from './priority';

export interface Task {
  _id: string;
  title?: string;
  status?: boolean;
  dueDate?: Date;
  priority?: string | Priority;
  description?: string;
}

import { Priority } from './priority';

export interface Task {
  id: string;
  title?: string;
  status?: boolean;
  dueDate?: Date;
  priority?: string | Priority;
  description?: string;
}

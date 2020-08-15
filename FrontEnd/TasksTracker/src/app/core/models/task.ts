import { Priority } from './priority';

export interface Task {
  _id: string;
  title: string;
  description: string;
  source: string;
  priority: string | Priority;
}

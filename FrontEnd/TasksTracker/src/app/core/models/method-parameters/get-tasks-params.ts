import { GetTasksFilterParams } from './get-tasks-filter-params';

export interface GetTasksParams {
  includePriority?: boolean;
  fromDate?: Date;
  toDate?: Date;
  filter?: GetTasksFilterParams;
}

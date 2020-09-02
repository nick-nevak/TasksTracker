import { GetTasksFilterParams } from './get-tasks-filter-params';

export interface GetTasksParams {
  includePriority?: boolean;
  fromDate?: Date;
  toDate?: Date;
  filterByStatus?: boolean;
  filterByDeleted?: boolean;
}

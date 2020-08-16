import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseDestroyableComponent } from '../../../core/base-classes/base-destroyable';
import { AppState } from '../../../core/core-store/core-store.module';
import { Store } from '@ngrx/store';
import { loadTasks, deleteTask, patchTask } from '../../../core/core-store/tasks/tasks.actions';
import { selectTasks } from '../../../core/core-store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent extends BaseDestroyableComponent implements OnInit, OnDestroy {

  tasks$: Observable<Task[]> = this.store.select(selectTasks);

  constructor(private store: Store<AppState>,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  onTaskStatusUpdated(event: {task: Task, updatedStatus: boolean}): void{
    const {task, updatedStatus} = event;
    const patchDocument = { status: updatedStatus };
    this.store.dispatch(patchTask({ taskId: task._id, patchDocument}));
  }

  onTaskEdited(task: Task): void {
    this.router.navigate(['/tasks', `${task._id}`]);
  }

  onTaskDeleted(task: Task): void {
    this.store.dispatch(deleteTask({ taskId: task._id }));
  }

}

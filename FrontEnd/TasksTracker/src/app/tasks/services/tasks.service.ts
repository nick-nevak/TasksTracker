import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/task';
import { GetTasksParams } from '../../core/models/method-parameters/get-tasks-params';
import { TaskStore } from '../state/taks/task.store';


export const baseUrl = 'http://localhost:3001';
const taskUrl = `${baseUrl}/task`;
const tasksUrl = `${taskUrl}s`;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient,
              private taskStore: TaskStore) { }

  getTask(taskId: string): Observable<Task> {
    return this.httpClient.get(`${taskUrl}/${taskId}`)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('task:', task)),
        tap(task => this.taskStore.update({ selectedTask: task }))
      );
  }

  getTasks(paramObj: GetTasksParams): Observable<Task[]> {
    const params = new HttpParams()
      .set('includePriority', `${paramObj.includePriority ?? ''}`)
      .set('fromDate', `${paramObj.fromDate?.toISOString() ?? ''}`)
      .set('toDate', `${paramObj.toDate?.toISOString() ?? ''}`)
      .set('filterByStatus', `${paramObj.filterByStatus ?? ''}`)
      .set('filterByDeleted', `${paramObj.filterByDeleted ?? ''}`);

    return this.httpClient.get(tasksUrl, { params })
      .pipe(
        map(tasks => tasks as Task[]),
        tap(tasks => console.log('tasks:', tasks)),
        tap(tasks => this.taskStore.set(tasks))
      );
  }

  createTask(newTask: Task): Observable<Task> {
    return this.httpClient.post(taskUrl, newTask)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('created task:', task)),
        tap(task => this.taskStore.add(task))
      );
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.httpClient.put(`${taskUrl}/${updatedTask._id}`, updatedTask)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('updated task:', task)),
        tap(task => this.taskStore.replace(task._id, task))
      );
  }

  deleteTask(taskId: string): Observable<any> {
    return this.httpClient.delete(`${taskUrl}/${taskId}`)
      .pipe(
        tap(_ => console.log('deleted taskId:', taskId)),
        map(_ => taskId),
        tap(_ => this.taskStore.remove(taskId))
      );
  }

  patchTask(taskId: string, patchDocument: { [key: string]: any }): Observable<Task> {
    return this.httpClient.patch(`${taskUrl}/${taskId}`, patchDocument)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('patched task:', task)),
        tap(task => this.taskStore.replace(task._id, task))
      );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { GetTasksParams } from '../models/method-parameters/get-tasks-params';
import { baseUrl } from '../../core/const/base-url';

const tasksUrl = `${baseUrl}/tasks`;

@Injectable({
  providedIn: 'root'
})
export class TasksHttpService {

  constructor(private httpClient: HttpClient) { }

  getTask(taskId: string): Observable<Task> {
    return this.httpClient.get(`${tasksUrl}/${taskId}`)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('task:', task)
        )
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
        tap(tasks => console.log('tasks:', tasks)
        )
      );
  }

  createTask(newTask: Task): Observable<Task> {
    return this.httpClient.post(tasksUrl, newTask)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('created task:', task))
      );
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.httpClient.put(`${tasksUrl}/${updatedTask._id}`, updatedTask)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('updated task:', task))
      );
  }

  deleteTask(taskId: string): Observable<any> {
    return this.httpClient.delete(`${tasksUrl}/${taskId}`)
      .pipe(
        tap(_ => console.log('deleted taskId:', taskId)),
        map(_ => taskId)
      );
  }

  patchTask(taskId: string, patchDocument: { [key: string]: string }): Observable<Task> {
    return this.httpClient.patch(`${tasksUrl}/${taskId}`, patchDocument)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('patched task:', task))
      );
  }

}

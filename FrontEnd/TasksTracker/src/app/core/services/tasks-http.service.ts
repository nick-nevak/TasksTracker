import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { GetTasksParams } from '../models/method-parameters/get-tasks-params';


export const baseUrl = 'http://localhost:3001';
const taskUrl = `${baseUrl}/task`;
const tasksUrl = `${taskUrl}s`;

@Injectable({
  providedIn: 'root'
})
export class TasksHttpService {

  constructor(private httpClient: HttpClient) { }

  getTask(taskId: string): Observable<Task> {
    return this.httpClient.get(`${taskUrl}/${taskId}`)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('task:', task)
        )
      );
  }

  getTasks(paramObj: GetTasksParams): Observable<Task[]> {
    const params = new HttpParams()
      .set('includePriority', `${paramObj.includePriority}`)
      .set('fromDate', `${paramObj.fromDate}`)
      .set('toDate', `${paramObj.toDate}`);

    return this.httpClient.get(tasksUrl, { params })
      .pipe(
        map(tasks => tasks as Task[]),
        tap(tasks => console.log('tasks:', tasks)
        )
      );
  }

  createTask(newTask: Task): Observable<Task> {
    return this.httpClient.post(taskUrl, newTask)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('created task:', task))
      );
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.httpClient.put(`${taskUrl}/${updatedTask._id}`, updatedTask)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('updated task:', task))
      );
  }

  deleteTask(taskId: string): Observable<any> {
    return this.httpClient.delete(`${taskUrl}/${taskId}`)
      .pipe(
        tap(_ => console.log('deleted taskId:', taskId)),
        map(_ => taskId)
      );
  }

  patchTask(taskId: string, patchDocument: { [key: string]: string }): Observable<Task> {
    return this.httpClient.patch(`${taskUrl}/${taskId}`, patchDocument)
      .pipe(
        map(task => task as Task),
        tap(task => console.log('patched task:', task))
      );
  }

}

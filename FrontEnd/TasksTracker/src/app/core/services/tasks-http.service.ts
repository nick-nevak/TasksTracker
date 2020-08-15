import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Task } from '../models/task';
import { Observable } from 'rxjs';


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

  getTasks(): Observable<Task[]> {
    return this.httpClient.get(tasksUrl)
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

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Priority } from '../models/priority';
import { Observable } from 'rxjs';
import { baseUrl } from './tasks-http.service';

const priorityUrl = `${baseUrl}/priority`;
const prioritiesUrl = `${priorityUrl}s`;

@Injectable({
  providedIn: 'root'
})
export class PrioritiesHttpService {

  constructor(private httpClient: HttpClient) { }

  getPriority(priorityId: string): Observable<Priority> {
    return this.httpClient.get(`${priorityUrl}/${priorityId}`)
      .pipe(
        map(priority => priority as Priority),
        tap(priority => console.log('priority:', priority)
        )
      );
  }

  getPrioritys(): Observable<Priority[]> {
    return this.httpClient.get(prioritiesUrl)
      .pipe(
        map(priorities => priorities as Priority[]),
        tap(priorities => console.log('priorities:', priorities)
        )
      );
  }

  createPriority(newPriority: Priority): Observable<Priority> {
    return this.httpClient.post(priorityUrl, newPriority)
      .pipe(
        map(priority => priority as Priority),
        tap(priority => console.log('created priority:', priority))
      );
  }

  updatePriority(updatedPriority: Priority): Observable<Priority> {
    return this.httpClient.put(`${priorityUrl}/${updatedPriority._id}`, updatedPriority)
      .pipe(
        map(priority => priority as Priority),
        tap(priority => console.log('updated priority:', priority))
      );
  }

  deletePriority(priorityId: string): Observable<any> {
    return this.httpClient.delete(`${priorityUrl}/${priorityId}`)
      .pipe(
        tap(_ => console.log('deleted priorityId:', priorityId)),
        map(_ => priorityId)
      );
  }

}

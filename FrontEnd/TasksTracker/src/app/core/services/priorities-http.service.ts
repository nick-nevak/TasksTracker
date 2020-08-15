import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Priority } from '../models/priority';
import { Observable } from 'rxjs';
import { baseUrl } from './tasks-http.service';

const priorityUrl = `${baseUrl}/priority`;
const prioritiesUrl = `${baseUrl}/priorities`;

@Injectable({
  providedIn: 'root'
})
export class PrioritiesHttpService {

  constructor(private httpClient: HttpClient) { }

  getPriorities(): Observable<Priority[]> {
    return this.httpClient.get(prioritiesUrl)
      .pipe(
        map(priorities => priorities as Priority[]),
        tap(priorities => console.log('priorities:', priorities)
        )
      );
  }

}

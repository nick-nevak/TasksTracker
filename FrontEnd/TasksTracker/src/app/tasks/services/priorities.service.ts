import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PriorityStore } from '../state/priority/priority.store';
import { Priority } from '../../core/models/priority';
import { baseUrl } from './tasks.service';

const prioritiesUrl = `${baseUrl}/priorities`;

@Injectable({
  providedIn: 'root'
})
export class PrioritiesService {

  constructor(private httpClient: HttpClient,
              private priorityStore: PriorityStore) { }

  getPriorities(): Observable<Priority[]> {
    return this.httpClient.get(prioritiesUrl)
      .pipe(
        map(priorities => priorities as Priority[]),
        tap(priorities => this.priorityStore.set(priorities))
      );
  }

}

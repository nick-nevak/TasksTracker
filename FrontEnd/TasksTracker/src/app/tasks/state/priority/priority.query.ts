import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Priority } from '../../../core/models/priority';
import { PriorityState, PriorityStore } from './priority.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PriorityQuery extends QueryEntity<PriorityState> {

  all$: Observable<Priority[]> = this.selectAll();
  dictionary$: Observable<Map<string, Priority>> = this.selectAll()
    .pipe(
      map(priorities => new Map(priorities.map(p => [p._id, p])))
    );

  constructor(protected store: PriorityStore) {
    super(store);
  }
}

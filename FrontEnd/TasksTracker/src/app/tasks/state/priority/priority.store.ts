import { Injectable } from '@angular/core';
import { Store, StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Priority } from '../../../core/models/priority';

export interface PriorityState extends EntityState<Priority, string> {
}

const createInitialState = () => ({});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'priority', idKey: '_id' })
export class PriorityStore extends EntityStore<PriorityState> {
  constructor() {
    super(createInitialState());
  }
}

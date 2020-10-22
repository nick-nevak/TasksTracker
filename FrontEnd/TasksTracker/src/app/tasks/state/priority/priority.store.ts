import { Store, StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Priority } from '../../../core/models/priority';

export interface PriorityState extends EntityState<Priority, string> {
}

const createInitialState = () => ({});

@StoreConfig({ name: 'priority', idKey: '_id' })
export class PriorityStore extends Store<PriorityState> {
  constructor() {
    super(createInitialState());
  }
}

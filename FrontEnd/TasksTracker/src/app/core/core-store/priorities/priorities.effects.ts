import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadPriorities, loadPrioritiesSuccess } from './priorities.actions';
import { PrioritiesHttpService } from '../../services/priorities-http.service';


@Injectable()
export class PrioritiesEffects {

  constructor(private actions$: Actions,
              private prioritiesHttpService: PrioritiesHttpService) { }

  @Effect()
  loadPriorities$ = this.actions$
    .pipe(
      ofType(loadPriorities),
      switchMap(() => this.prioritiesHttpService.getPriorities()),
      map(loadedPriorities => loadPrioritiesSuccess({ priorities: loadedPriorities }))
    );

}

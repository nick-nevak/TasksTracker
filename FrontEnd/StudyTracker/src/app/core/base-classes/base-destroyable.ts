import { OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';

// The main purpose of this class - provide approach to autmated unsubscribe Rx pipes when component or service destroys.
// F.E. you can use takeUntil(this.componentAlive$) operator in pipe.
@Component({template: ''})
export class BaseDestroyableComponent implements OnDestroy {

  private componentAlive = new Subject();
  protected componentAlive$ = this.componentAlive.asObservable();

  ngOnDestroy(): void {
    this.componentAlive.next();
    this.componentAlive.complete();
  }
}

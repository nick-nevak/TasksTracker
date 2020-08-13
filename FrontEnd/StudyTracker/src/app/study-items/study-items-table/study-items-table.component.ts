import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudyItemsHttpService } from '../services/study-items-http.service';
import { BaseDestroyableComponent } from '../../core/base-classes/base-destroyable';
import { takeUntil, tap } from 'rxjs/operators';
import { StudyItem } from '../models/study-item';

@Component({
  selector: 'app-study-items-table',
  templateUrl: './study-items-table.component.html',
  styleUrls: ['./study-items-table.component.scss']
})
export class StudyItemsTableComponent extends BaseDestroyableComponent implements OnInit, OnDestroy {

  items: StudyItem[];

  constructor(private studyItemsHttpService: StudyItemsHttpService) {
    super();
  }

  ngOnInit(): void {
    this.studyItemsHttpService.getItems()
      .pipe(
        tap(items => this.items = items)
      ).subscribe();
  }

  delete(item: StudyItem) {
    this.studyItemsHttpService.deleteItem(item._id)
      .pipe(
        tap(_ => this.items.filter(i => i._id !== item._id))
      ).subscribe();
  }

}

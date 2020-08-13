import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyItemsHttpService } from '../services/study-items-http.service';
import { StudyItem } from '../models/study-item';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { BaseDestroyableComponent } from 'src/app/core/base-classes/base-destroyable';
import { of } from 'rxjs';

@Component({
  selector: 'app-study-item-edit',
  templateUrl: './study-item-edit.component.html',
  styleUrls: ['./study-item-edit.component.scss']
})
export class StudyItemEditComponent extends BaseDestroyableComponent implements OnInit {

  item: StudyItem;
  itemId: string;

  constructor(private studyItemsHttpService: StudyItemsHttpService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      tap(paramMap => this.itemId = paramMap.get('id')),
      tap(_ => this.getItem(this.itemId)),
      takeUntil(this.componentAlive$)
    );
    this.initializeFormModel();
  }

  save(item: StudyItem) {
    this.itemId ? this.updateItem(item) : this.createItem(item);
  }

  private initializeFormModel(): void {
    this.item = {
      _id: '',
      title: '',
      description: '',
      source: ''
    };
  }

  private getItem(itemId: string): void {
    this.studyItemsHttpService.getItem(itemId)
      .pipe(
        tap(item => this.item = item)
      ).subscribe();
  }

  private createItem(item: StudyItem) {
    this.studyItemsHttpService.createItem(item)
      .pipe(
        tap(_ => this.router.navigate(['/'])),
        catchError(e => {
          console.error(e);
          return of(undefined);
        })
      ).subscribe();
  }

  private updateItem(item: StudyItem) {
    this.studyItemsHttpService.updateItem(item)
      .pipe(
        tap(_ => this.router.navigate(['/'])),
        catchError(e => {
          console.error(e);
          return of(undefined);
        })
      ).subscribe();
  }

}

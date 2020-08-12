import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { StudyItem } from '../models/study-item';
import { Observable } from 'rxjs';


export const baseUrl = 'http://localhost:3001';
const itemUrl = `${baseUrl}/item`;
const itemsUrl = `${itemUrl}s`;

@Injectable({
  providedIn: 'root'
})
export class StudyItemsHttpService {

  constructor(private httpClient: HttpClient) { }

  getItem(): Observable<StudyItem> {
    return this.httpClient.get(itemUrl)
      .pipe(
        map(item => item as StudyItem),
        tap(item => console.log('item:', item)
        )
      );
  }

  getItems(): Observable<StudyItem[]> {
    return this.httpClient.get(itemsUrl)
      .pipe(
        map(items => items as StudyItem[]),
        tap(items => console.log('items:', items)
        )
      );
  }

  createItem(studyItem: StudyItem): Observable<StudyItem> {
    return this.httpClient.post(itemUrl, studyItem)
      .pipe(
        map(item => item as StudyItem),
        tap(item => console.log('created item:', item))
      );
  }

}

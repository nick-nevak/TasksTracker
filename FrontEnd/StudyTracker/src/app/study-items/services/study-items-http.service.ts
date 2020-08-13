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

  getItem(itemId: string): Observable<StudyItem> {
    return this.httpClient.get(`${itemUrl}/${itemId}`)
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

  updateItem(studyItem: StudyItem): Observable<StudyItem> {
    return this.httpClient.put(`${itemUrl}/${studyItem._id}`, studyItem)
      .pipe(
        map(item => item as StudyItem),
        tap(item => console.log('updated item:', item))
      );
  }

  deleteItem(itemId: string): Observable<any> {
    return this.httpClient.delete(`${itemUrl}/${itemId}`)
      .pipe(
        tap(item => console.log('deleted itemId:', itemId))
      );
  }

}

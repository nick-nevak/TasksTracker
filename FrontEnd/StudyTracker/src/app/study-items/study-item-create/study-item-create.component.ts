import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { StudyItemsHttpService } from '../services/study-items-http.service';
import { StudyItem } from '../models/study-item';

@Component({
  selector: 'app-study-item-create',
  templateUrl: './study-item-create.component.html',
  styleUrls: ['./study-item-create.component.scss']
})
export class StudyItemCreateComponent implements OnInit {

  item: StudyItem = {
    title: '',
    description: '',
    source: ''
  };

  constructor(private studyItemsHttpService: StudyItemsHttpService) { }

  ngOnInit(): void {
  }

  save(item: StudyItem) {
    debugger;
    this.studyItemsHttpService.createItem(item)
      .subscribe(item => this.item = item);
  }

}

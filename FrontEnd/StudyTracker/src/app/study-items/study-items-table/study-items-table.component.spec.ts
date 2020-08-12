import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyItemsTableComponent } from './study-items-table.component';

describe('StudyItemsTableComponent', () => {
  let component: StudyItemsTableComponent;
  let fixture: ComponentFixture<StudyItemsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyItemsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

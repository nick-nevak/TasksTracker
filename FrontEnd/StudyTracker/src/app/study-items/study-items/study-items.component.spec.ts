import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyItemsComponent } from './study-items.component';

describe('StudyItemsComponent', () => {
  let component: StudyItemsComponent;
  let fixture: ComponentFixture<StudyItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

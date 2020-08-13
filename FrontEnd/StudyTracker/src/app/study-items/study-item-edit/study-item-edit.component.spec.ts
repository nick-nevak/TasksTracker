import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyItemEditComponent } from './study-item-edit.component';

describe('StudyItemCreateComponent', () => {
  let component: StudyItemEditComponent;
  let fixture: ComponentFixture<StudyItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

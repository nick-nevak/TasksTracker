import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyItemCreateComponent } from './study-item-create.component';

describe('StudyItemCreateComponent', () => {
  let component: StudyItemCreateComponent;
  let fixture: ComponentFixture<StudyItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyItemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

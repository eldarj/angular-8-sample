import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddDialogComponent } from './person-add-dialog.component';

describe('PersonAddDialogComponent', () => {
  let component: PersonAddDialogComponent;
  let fixture: ComponentFixture<PersonAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

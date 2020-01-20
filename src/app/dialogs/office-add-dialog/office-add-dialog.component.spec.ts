import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAddDialogComponent } from './office-add-dialog.component';

describe('OfficeAddDialogComponent', () => {
  let component: OfficeAddDialogComponent;
  let fixture: ComponentFixture<OfficeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

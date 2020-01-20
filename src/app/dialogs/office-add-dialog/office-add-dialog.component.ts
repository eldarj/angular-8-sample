import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OfficeService} from '../../services/office.service';
import {Office} from '../../models/office.model';

export interface OfficeAddDialogData {
  name: string;
}

@Component({
  selector: 'app-office-add-dialog',
  templateUrl: './office-add-dialog.component.html',
  styleUrls: ['./office-add-dialog.component.scss']
})
export class OfficeAddDialogComponent {
  officeForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: OfficeAddDialogData,
              public dialogRef: MatDialogRef<OfficeAddDialogComponent>,
              private formBuilder: FormBuilder,
              private officeService: OfficeService) {
    this.createForm();
  }

  createForm(): void {
    this.officeForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required, Validators.minLength(2), Validators.maxLength(30)
      ])
    });
  }

  submitForm(name): void {
    const office = new Office();
    office.name = name;

    this.officeService.createOffice(office)
      .subscribe(() => this.dialogRef.close());
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.officeForm.controls[controlName].hasError(errorName);
  }
}


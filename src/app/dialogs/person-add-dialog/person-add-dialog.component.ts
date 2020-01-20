import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Office} from '../../models/office.model';
import {PersonService} from '../../services/person.service';
import {Person} from '../../models/person.model';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';

export interface PersonAddDialogData {
  offices: Array<Office>;
}

@Component({
  selector: 'app-person-add-dialog',
  templateUrl: './person-add-dialog.component.html',
  styleUrls: ['./person-add-dialog.component.scss']
})
export class PersonAddDialogComponent {
  personForm: FormGroup;

  profileImgClass = 'no-img';
  profileImgSrc: string | ArrayBuffer;

  profileImgBigClass = 'no-img';
  profileImgBigSrc: string | ArrayBuffer;

  public showWebcam = false;
  private trigger: Subject<void> = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<PersonAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PersonAddDialogData,
              private formBuilder: FormBuilder,
              private personService: PersonService) {
    this.createForm();
  }

  createForm() {
    this.personForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required, Validators.minLength(2), Validators.maxLength(30)
      ]),
      office: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      profileImg: new FormControl(),
      profileImgBig: new FormControl()
    });

    navigator.mediaDevices.getUserMedia({video: true})
      .then((stream) => {
        this.showWebcam = true;
      })
      .catch(err => {
        this.showWebcam = false;
      });
  }

  submitForm(name, officeId, description): void {
    const office: Office = new Office();
    office.id = officeId;

    this.personService.createPerson(new Person(name, office, this.profileImgSrc, this.profileImgBigSrc, description))
      .subscribe(() => this.dialogRef.close());
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  hasError(controlName: string, errorName: string) {
    return this.personForm.controls[controlName].hasError(errorName);
  }

  onProfileImgChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      reader.onload = () => {
        this.profileImgSrc = reader.result;
        this.profileImgClass = 'has-img';
      };

      const [file] = event.target.files;
      reader.readAsDataURL(file);
    }
  }

  onProfileImgBigChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      reader.onload = () => {
        this.profileImgBigSrc = reader.result;
        this.profileImgBigClass = 'has-img';
      };

      const [file] = event.target.files;
      reader.readAsDataURL(file);
    }
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image');
    console.log(webcamImage.imageAsDataUrl);
    this.updateSrc(webcamImage.imageAsDataUrl);
  }

  private updateSrc(dataUrl) {
    this.profileImgSrc = dataUrl;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  triggerSnapshot() {
    this.trigger.next();
  }
}

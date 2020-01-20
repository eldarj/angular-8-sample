import {Office} from './office.model';

export class Person {
  public id: string;

  public name: string;
  public description: string;
  public liked: boolean;

  public profileImg: string | ArrayBuffer;
  public profileImgBig: string | ArrayBuffer;

  public office: Office;

  constructor(name: string, office: Office, profileImg: string | ArrayBuffer, profileImgBig: string | ArrayBuffer, description: string) {
    this.name = name;
    this.office = office;
    this.description = description;
    this.liked = false;

    this.profileImg = profileImg;
    this.profileImgBig = profileImgBig;
  }
}

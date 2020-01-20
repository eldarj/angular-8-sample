import {EventEmitter, Injectable, Output} from '@angular/core';
import {displayPersonsType} from '../models/enums/display.persons.type.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedSettingsService {
  @Output() personCardsLayoutClassEmitter: EventEmitter<string> = new EventEmitter();
  @Output() displayPersonsTypeEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  changePersonCardsLayout(layoutClass: string) {
    this.personCardsLayoutClassEmitter.emit(layoutClass);
  }

  displayAllPersons() {
    this.displayPersonsTypeEmitter.emit(displayPersonsType.ALL);
  }

  displayLikedPersons() {
    this.displayPersonsTypeEmitter.emit(displayPersonsType.LIKED);
  }
}

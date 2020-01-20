import {Component, Input} from '@angular/core';
import {Person} from '../../models/person.model';
import {PersonService} from '../../services/person.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {
  @Input() personModel: Person;

  constructor(private personService: PersonService) {
  }

  private onLike() {
    if (this.personModel.liked) {
      this.personService.unlikePerson(this.personModel);
    } else {
      this.personService.likePerson(this.personModel);
    }
  }

  private deletePerson(personId: string) {
    this.personService.deletePerson(personId).subscribe();
  }
}

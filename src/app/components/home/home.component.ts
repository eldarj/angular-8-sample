import {Component, OnInit} from '@angular/core';
import {SharedSettingsService} from '../../services/shared-settings.service';
import {Observable} from 'rxjs';
import {PersonService} from '../../services/person.service';
import {Office} from '../../models/office.model';
import {OfficeService} from '../../services/office.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  setting = {name: 'Sound'};
  office$: Observable<Array<Office>>;
  layoutClass = 'layout-cards';

  constructor(private settingsService: SharedSettingsService,
              private officeService: OfficeService) {
  }

  ngOnInit() {
    this.office$ = this.officeService.getOfficesSubject();
    this.officeService.getOffices().subscribe();

    this.settingsService.personCardsLayoutClassEmitter.subscribe(layoutClass => {
      this.layoutClass = layoutClass;
    });
  }

  private deleteOffice(officeId: string) {
    this.officeService.deleteOffice(officeId).subscribe();
  }
}

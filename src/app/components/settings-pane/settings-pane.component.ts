import {Component, Input} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {SettingsOptionsComponent} from './settings-options/settings-options.component';
import {SharedSettingsService} from 'src/app/services/shared-settings.service';
import {MatDialog} from '@angular/material';
import {PersonAddDialogComponent, PersonAddDialogData} from '../../dialogs/person-add-dialog/person-add-dialog.component';
import {OfficeAddDialogComponent} from '../../dialogs/office-add-dialog/office-add-dialog.component';
import {OfficeService} from '../../services/office.service';

@Component({
  selector: 'app-settings-pane',
  templateUrl: './settings-pane.component.html',
  styleUrls: ['./settings-pane.component.scss']
})
export class SettingsPaneComponent {
  @Input() setting;

  constructor(private settingsService: SharedSettingsService,
              private officeService: OfficeService,
              private bottomSheet: MatBottomSheet,
              private matDialog: MatDialog) {

    if (this.setting.video.fps) {

    }
  }

  openSettingsPane() {
    const self = this;
    const options = [
      {
        text: 'Card grid', icon: 'view_list', onClick() {
          self.settingsService.changePersonCardsLayout('layout-cards');
        }
      },
      {
        text: 'List grid', icon: 'view_module', onClick() {
          self.settingsService.changePersonCardsLayout('layout-list');
        }
      }
    ];

    this.bottomSheet.open(SettingsOptionsComponent, {
      data: {options}
    });
  }

  openAddOfficeDialog(): void {
    this.matDialog.open(OfficeAddDialogComponent);
  }

  openAddPersonDialog(): void {
    const office$ = this.officeService.getOfficesSubject();
    const dialogData: PersonAddDialogData = {offices: []};
    office$.subscribe(results => dialogData.offices = results);
    this.matDialog.open(PersonAddDialogComponent, {data: dialogData});
  }

  displayAllPersons() {
    this.settingsService.displayAllPersons();
  }

  displayLikedPersons() {
    this.settingsService.displayLikedPersons();
  }
}

import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-settings-options',
  templateUrl: './settings-options.component.html',
  styleUrls: ['./settings-options.component.scss']
})
export class SettingsOptionsComponent  {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
}

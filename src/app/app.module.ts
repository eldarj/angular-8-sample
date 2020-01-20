import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {WebcamModule} from 'ngx-webcam';

import {StoreModule} from '@ngrx/store';
import {personsReducer} from './stores/reducers/persons.reducer';
import {likedPersonsReducer} from './stores/reducers/liked.persons.reducer';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';

import {MainNavBarComponent} from './components/main-nav-bar/main-nav-bar.component';
import {PersonCardComponent} from './components/person-card/person-card.component';
import {SettingsPaneComponent} from './components/settings-pane/settings-pane.component';
import {SettingsOptionsComponent} from './components/settings-pane/settings-options/settings-options.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PersonService} from './services/person.service';
import {SharedSettingsService} from './services/shared-settings.service';
import {HomeComponent} from './components/home/home.component';
import {PersonAddDialogComponent} from './dialogs/person-add-dialog/person-add-dialog.component';
import {MaterialModule} from './modules/material-module';
import { OfficeAddDialogComponent } from './dialogs/office-add-dialog/office-add-dialog.component';

import { HttpClientModule } from '@angular/common/http';
import {OfficeService} from './services/office.service';
import {ServerConfigService} from './services/server.config.service';

export function serverConfigServiceFactory(serverConfigService: ServerConfigService) {
  return () => serverConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavBarComponent,
    PersonCardComponent, PersonAddDialogComponent, OfficeAddDialogComponent,
    SettingsPaneComponent, SettingsOptionsComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    StoreModule.forRoot({personsStore: personsReducer, likedPersonsStore: likedPersonsReducer}),
    WebcamModule
  ],
  entryComponents: [
    SettingsOptionsComponent,
    PersonAddDialogComponent,
    OfficeAddDialogComponent
  ],
  providers: [
    PersonService,
    SharedSettingsService,
    OfficeService,
    {
      provide: APP_INITIALIZER,
      useFactory: serverConfigServiceFactory,
      deps: [ServerConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

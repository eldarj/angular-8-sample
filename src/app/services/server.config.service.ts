import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {
  private static STORAGE_KEY = 'serverConfigStorageKey';
  private dataResourceUrl = 'http://localhost:8080/api/offices/test';

  menuItems = null;

  constructor(private http: HttpClient) {
  }

  load(): Promise<any> {
    // if (sessionStorage.getItem(ServerConfigService.STORAGE_KEY) == null) {
    if (this.menuItems == null) {
      return this.http.get(this.dataResourceUrl).toPromise()
        .then(
          data => this.menuItems = data,
          error => console.log(error)
        );
    }
  }

  getMenuItems(): any {
    // return JSON.parse(sessionStorage.getItem(ServerConfigService.STORAGE_KEY));
    return this.menuItems;
  }
}

import {EventEmitter, Injectable, Output} from '@angular/core';
import {Office} from '../models/office.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, concatMap, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private baseUrl = 'http://localhost:8080/api/';
  private officesBehaviorSubject = new BehaviorSubject<Array<Office>>([]);

  constructor(private http: HttpClient) {
  }

  getOfficesSubject(): Observable<Array<Office>> {
    return this.officesBehaviorSubject.asObservable();
  }

  getOffices(): Observable<Array<Office>> {
    console.log('Get offices');
    return this.http.get<Array<Office>>(this.baseUrl + 'offices')
      .pipe(
        tap(result => {
          console.log(result);
          this.officesBehaviorSubject.next(result);
        }),
        catchError(this.errorHandler)
      );
  }

  createOffice(office: Office): Observable<Array<Office>> {
    return this.http.post<Office>(this.baseUrl + 'offices', office)
      .pipe(
        concatMap(() => this.getOffices()),
        catchError(this.errorHandler)
      );
  }

  deleteOffice(officeId: string): Observable<Array<Office>> {
    return this.http.delete<Office>(this.baseUrl + 'offices/' + officeId)
      .pipe(
        concatMap(() => this.getOffices()),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
}

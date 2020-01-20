import {Injectable} from '@angular/core';
import {Person} from '../models/person.model';
import {addArray} from '../stores/actions/persons.actions';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {like, unlike} from '../stores/actions/liked.persons.actions';
import {Office} from '../models/office.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {OfficeService} from './office.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'http://localhost:8080/api/';
  private officesBehaviorSubject = new BehaviorSubject<Array<Office>>([]);

  persons$: Observable<Array<Person>>;
  likedPersons$: Observable<Array<Person>>;

  constructor(private store: Store<{ personsStore: Array<Person>, likedPersonsStore: Array<Person> }>,
              private officeService: OfficeService,
              private http: HttpClient) {
    this.persons$ = store.pipe(select('personsStore'));
    this.likedPersons$ = store.pipe(select('likedPersonsStore'));
  }

  createPerson(person: Person) {
    return this.http.post<Person>(this.baseUrl + 'persons', person)
      .pipe(
        tap(() => this.officeService.getOffices().subscribe()),
        catchError(this.errorHandler)
      );
  }

  deletePerson(personId: string) {
    return this.http.delete<Person>(this.baseUrl + 'persons/' + personId)
      .pipe(
        tap(() => this.officeService.getOffices().subscribe()),
        catchError(this.errorHandler)
      );
  }

  // todo - remove or use if possible
  public getLikedPersons() {
    return this.likedPersons$;
  }

  public getPersons() {
    return this.persons$;
  }

  public addPersons(persons: Array<Person>) {
    this.store.dispatch(addArray({persons}));
  }

  public likePerson(person: Person) {
    this.store.dispatch(like({person}));
  }

  public unlikePerson(person: Person) {
    const personName = person.name;
    this.store.dispatch(unlike({personName}));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
}

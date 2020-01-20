import {createAction, props} from '@ngrx/store';
import {Person} from '../../models/person.model';

export const add = createAction('[Persons Component] Add', props<{ person: Person }>());
export const addArray = createAction('[Persons Component] Add Bulk', props<{ persons: Array<Person> }>());
export const remove = createAction('[Persons Component] Remove', props<{ personName: string }>());

import {createAction, props} from '@ngrx/store';
import {Person} from '../../models/person.model';

export const like = createAction('[Persons Component] Like', props<{ person: Person }>());
export const unlike = createAction('[Persons Component] Unlike', props<{ personName: string }>());

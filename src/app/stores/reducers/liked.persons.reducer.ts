import {createReducer, on} from '@ngrx/store';
import {like, unlike} from 'src/app/stores/actions/liked.persons.actions';
import {Person} from '../../models/person.model';

export const initialState: Array<Person> = [];

const reducer = createReducer(initialState,
  on(like, (state, data) => {
    state.push(data.person);
    return state;
  }),
  on(unlike, (state, data) => {
    return state.filter(item => {
      return item.name !== data.personName;
    });
  }),
);

export function likedPersonsReducer(state, action) {
  return reducer(state, action);
}

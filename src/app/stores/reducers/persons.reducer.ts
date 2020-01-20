import {createReducer, on} from '@ngrx/store';
import {add, addArray, remove} from 'src/app/stores/actions/persons.actions';
import {like, unlike} from 'src/app/stores/actions/liked.persons.actions';
import {Person} from '../../models/person.model';

export const initialState: Array<Person> = [];

const reducer = createReducer(initialState,
  on(add, (state, data) => {
    state.push(data.person);
    return state;
  }),
  on(addArray, (state, data) => {
    state.push(...data.persons);
    return state;
  }),
  on(remove, (state, data) => {
    state.filter(item => item.name !== data.personName);
    return state;
  }),
  on(like, (state, data) => {
    state.map(person => {
      if (person.name === data.person.name) {
        person.liked = true;
      }
    });
    return state;
  }),
  on(unlike, (state, data) => {
    state.map(person => {
      if (person.name === data.personName) {
        person.liked = false;
      }
    });
    return state;
  }),
);

export function personsReducer(state, action) {
  return reducer(state, action);
}

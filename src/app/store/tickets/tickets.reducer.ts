import { Action, createReducer, on } from '@ngrx/store';
import { fetchSearchIdSuccessAction, fetchTicketsSuccessAction } from './tickets.actions';


export interface TicketsState {
  searchId: string;
  entities: any;
}

export interface State {
  tickets: TicketsState;
}

export const initialState: TicketsState = {
  searchId: null,
  entities: {},
};

const reducer = createReducer(
  initialState,
  on(fetchSearchIdSuccessAction, (state, {payload}) => {
    return ({
      ...state,
      searchId: payload
    });
  }),
  on(fetchTicketsSuccessAction, (state, {payload}) => {
    return ({
      ...state,
      entities: payload
    });
  }),
);

export function ticketsReducer(state: TicketsState, action: Action): TicketsState {
  return reducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';
import { fetchSearchIdSuccessAction, fetchTicketsSuccessAction } from './tickets.actions';
import { TicketInterface } from '../../interfaces/ticket.interface';


export interface TicketsState {
  stop: boolean;
  entities: TicketInterface[];
}

export interface State {
  tickets: TicketsState;
}

export const initialState: TicketsState = {
  stop: false,
  entities: [],
};

const reducer = createReducer(
  initialState,
  on(fetchTicketsSuccessAction, (state, {payload}) => {
    return ({
      ...state,
      stop: payload.stop,
      entities: payload.tickets,
    });
  }),
);

export function ticketsReducer(state: TicketsState, action: Action): TicketsState {
  return reducer(state, action);
}

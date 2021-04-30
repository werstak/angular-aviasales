import { Action, createReducer, on } from '@ngrx/store';
import { TicketInterface } from '../../interfaces/ticket.interface';
import { fetchTicketsSuccessAction } from './tickets.actions';


export interface TicketsState {
  entities: TicketInterface[];
  stop: boolean;
}

export interface AppState {
  tickets: TicketsState;
}

export const initialState: TicketsState = {
  entities: [],
  stop: false,
};

const reducer = createReducer(
  initialState,
  on(fetchTicketsSuccessAction, (state, {payload}) => {
    return {
      ...state,
      entities: payload.tickets,
      stop: payload.stop,
    };
  }),
);

export function ticketsReducer(state: TicketsState, action: Action): TicketsState {
  return reducer(state, action);
}

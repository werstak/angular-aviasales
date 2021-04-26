import { Action, createReducer, on } from '@ngrx/store';
import { fetchTicketsSuccessAction } from './tickets.actions';


export interface TicketsState {
  converts: {
    fromAmount: number;
    toAmount: number;
    from: string;
    to: string;
  };
  entities: { [key: string]: string };
  rates: { [key: string]: { [key: string]: number } };
  baseCurrency: string;
}

export interface State {
  tickets: TicketsState;
}

export const initialState: TicketsState = {
  converts: null,
  entities: {},
  rates: {},
  baseCurrency: 'EUR',
};


const reducer = createReducer(
  initialState,
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

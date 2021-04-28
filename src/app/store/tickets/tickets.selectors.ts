import { AppState, TicketsState } from './tickets.reducer';
import { createSelector } from '@ngrx/store';


export const selectTicketsState = (state: AppState) => state.tickets;

export const selectTickets = createSelector(
  selectTicketsState,
  (state: TicketsState) => state.entities
);

export const selectFilters = createSelector(
  selectTicketsState,
  (state: TicketsState, props) => state.entities[props]
);

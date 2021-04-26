import { State, TicketsState } from './tickets.reducer';
import { createSelector } from '@ngrx/store';

export const selectTicketsState = (state: State) => state.tickets;

export const selectSearchId = createSelector(
  selectTicketsState,
  (state: TicketsState) => state.searchId
);

export const selectTickets = createSelector(
  selectTicketsState,
  (state: TicketsState) => state.entities
);

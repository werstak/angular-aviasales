import { AppState, TicketsState } from './tickets.reducer';
import { createSelector } from '@ngrx/store';


export const selectTicketsState = (state: AppState) => state.tickets;

export const selectTickets = createSelector(
  selectTicketsState,
  (state: TicketsState, {filters, limit = 5}) => {
    return state.entities
      .filter(entity => {
        const [segment] = entity.segments;
        const transferCount = segment.stops.length;

        const {withoutTransfers, oneTransfers, twoTransfers, threeTransfers} = filters || {};
        return (withoutTransfers && transferCount === 0) ||
          (oneTransfers && transferCount === 1) ||
          (twoTransfers && transferCount === 2) ||
          (threeTransfers && transferCount === 3);
      })
      .slice(0, limit);
  }
);

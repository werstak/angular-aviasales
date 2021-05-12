import { AppState, TicketsState } from './tickets.reducer';
import { createSelector } from '@ngrx/store';

export const selectTicketsState = (state: AppState) => state.tickets;

export const selectAllTickets = createSelector(
  selectTicketsState,
  (state: TicketsState) => state.entities
);

export const selectTickets = createSelector(
  selectTicketsState,
  (state: TicketsState, {filters, limit, sort: sorts}) => {
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
      .sort(getSortFunction(sorts))
      .slice(0, limit);
  }
);

/** Sorting start depending on the received data */
const getSortFunction = (sorts: string) => {
  if (sorts === 'cheap') {
    return sortByPrice;
  } else if (sorts === 'fast') {
    return sortByDuration;
  } else {
    return;
  }
};

const sortByPrice = (a, b) => {
  return a.price - b.price;
};

const sortByDuration = (a, b) => {
  return a.segments[0].duration - b.segments[0].duration;
};

import { AppState, TicketsState } from './tickets.reducer';
import { createSelector } from '@ngrx/store';


export const selectTicketsState = (state: AppState) => state.tickets;

export const selectTickets = createSelector(
  selectTicketsState,
  (state: TicketsState, {filters, limit = 5, sort: sorts}) => {

    console.log('sort', sorts);

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
      .sort(sorts === 1 ? sortByPrice : sortByDuration)
      .slice(0, limit);
  }
);

const sortByPrice = (item1, item2) => {
  if (item1.price < item2.price) {
    return -1;
  } else if (item1.price < item2.price) {
    return 1;
  } else {
    return 0;
  }
};

const sortByDuration = (item1, item2) => {
  if (item1.duration < item2.duration) {
    return -1;
  } else if (item1.duration < item2.duration) {
    return 1;
  } else {
    return 0;
  }
};

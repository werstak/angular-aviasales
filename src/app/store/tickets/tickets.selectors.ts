import { AppState, TicketsState } from './tickets.reducer';
import { createSelector } from '@ngrx/store';

export const selectTicketsState = (state: AppState) => state.tickets;

export const selectTickets = createSelector(
  selectTicketsState,
  (state: TicketsState, {filters, limit = 5, sort: sorts}) => {
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
      // .sort(sorts === 'cheap' ? sortByPrice : sortByDuration)
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


/*const sortByPrice = (item1, item2) => {
  console.log('sortByPrice');
  if (item1.price < item2.price) {
    return -1;
  } else if (item1.price > item2.price) {
    return 1;
  } else {
    return 0;
  }
};


const sortByDuration = (item1, item2) => {
  console.log('sortByDuration');
  if (item1.segments[0].duration < item2.segments[0].duration) {
    return -1;
  } else if (item1.segments[0].duration > item2.segments[0].duration) {
    return 1;
  } else {
    return 0;
  }
};*/

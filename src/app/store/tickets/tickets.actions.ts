import { createAction, props } from '@ngrx/store';
import { TicketsInterface } from '../../interfaces/tickets.interface';

export const fetchTicketsAction = createAction(
  '[Tickets] Fetch Tickets'
);

export const fetchTicketsSuccessAction = createAction(
  '[Tickets] Fetch Tickets Success',
  props<{ payload: { [key: string]: string } }>()
);

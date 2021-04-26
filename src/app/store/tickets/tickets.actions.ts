import { createAction, props } from '@ngrx/store';
import { TicketsInterface } from '../../interfaces/tickets.interface';
import { TicketsParamsInterface } from '../../interfaces/tickets-params.interface';

export const fetchSearchIdAction = createAction(
  '[Tickets] Fetch SearchId',
);

export const fetchSearchIdSuccessAction = createAction(
  '[Tickets] Fetch SearchId Success',
  props<{ payload: any }>()
);

export const fetchTicketsAction = createAction(
  '[Tickets] Fetch Tickets'
);

export const fetchTicketsSuccessAction = createAction(
  '[Tickets] Fetch Tickets Success',
  props<{ payload: { [key: string]: string } }>()
);

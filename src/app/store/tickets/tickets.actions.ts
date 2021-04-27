import { createAction, props } from '@ngrx/store';
import { TicketsInterface } from '../../interfaces/tickets.interface';


export const fetchSearchIdAction = createAction(
  '[Tickets] Fetch SearchId',
);
export const fetchSearchIdSuccessAction = createAction(
  '[Tickets] Fetch SearchId Success',
  props<{ payload: string }>()
);
export const fetchSearchIdFailAction = createAction(
  '[Tickets] Fetch SearchId Fail',
  props<{ payload: Error }>()
);


export const fetchTicketsAction = createAction(
  '[Tickets] Fetch Tickets'
);
export const fetchTicketsSuccessAction = createAction(
  '[Tickets] Fetch Tickets Success',
  props<{ payload: TicketsInterface }>()
);
export const fetchTicketsFailAction = createAction(
  '[Tickets] Fetch Tickets Fail',
  props<{ payload: Error }>()
);

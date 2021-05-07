import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import {
  fetchSearchIdAction,
  fetchSearchIdFailAction,
  fetchSearchIdSuccessAction,
  fetchTicketsFailAction,
  fetchTicketsSuccessAction
} from './tickets.actions';

import { TicketsService } from '../../services/tickets.service';
import { Store } from '@ngrx/store';

@Injectable()

export class TicketsEffects {
  constructor(
    public store: Store,
    private actions$: Actions,
    private ticketsService: TicketsService
  ) {
  }

  fetchSearchIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSearchIdAction),
    switchMap(() => this.ticketsService.fetchSearchId()
      .pipe(
        map(id => fetchSearchIdSuccessAction({payload: id})),
        catchError(error => {
          return of(fetchSearchIdFailAction({payload: error}));
        }),
      )))
  );

  fetchSearchIdFailAction$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSearchIdFailAction),
    tap(({payload}) => {
      console.log(payload);
    })
  ));


  fetchTicketsAction$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSearchIdSuccessAction),
    switchMap(({payload}) => this.ticketsService.fetchListTickets(payload)
      .pipe(
        map(tickets => {
          return fetchTicketsSuccessAction({payload: tickets});
        }),
        catchError(error => {
          return of(fetchTicketsFailAction({payload: error}));
        }),
      )))
  );

  fetchTicketsFailAction$ = createEffect(() => this.actions$.pipe(
    ofType(fetchTicketsFailAction),
    tap(({payload}) => {
      console.log(payload);
    })
  ));

}


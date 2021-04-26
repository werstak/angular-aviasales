import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  fetchSearchIdAction,
  fetchSearchIdSuccessAction,
  fetchTicketsAction,
  fetchTicketsSuccessAction
} from './tickets.actions';

import { TicketsService } from '../../services/tickets.service';
import { Store } from '@ngrx/store';

@Injectable()

export class CurrencyEffects {

  baseCurrency$ = this.store.select(fetchSearchIdSuccessAction);

  constructor(
    public store: Store,
    private actions$: Actions,
    private ticketsService: TicketsService
  ) {
  }


  test = createEffect(() => this.actions$.pipe(
    ofType(fetchSearchIdAction),
    mergeMap(() => this.ticketsService.fetchSearchId()
      .pipe(
        map(tickets => fetchSearchIdSuccessAction({payload: tickets})),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        }),
      )))
  );


  fetchTickets$ = createEffect(() => this.actions$.pipe(
    ofType(fetchTicketsAction),
    mergeMap(() => this.ticketsService.fetchListTickets()
      .pipe(
        map(tickets => fetchTicketsSuccessAction({payload: tickets})),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        }),
      )))
  );

}

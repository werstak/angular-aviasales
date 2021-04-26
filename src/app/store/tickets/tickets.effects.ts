import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { fetchTicketsAction, fetchTicketsSuccessAction } from './tickets.actions';

import { TicketsService } from '../../services/tickets.service';

@Injectable()

export class CurrencyEffects {

  constructor(
    private actions$: Actions,
    private ticketsService: TicketsService
  ) {
  }

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

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TicketInterface } from '../interfaces/ticket.interface';
import { pluck } from 'rxjs/operators';
import { TicketsInterface } from '../interfaces/tickets.interface';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(
    private store: Store,
    private httpClient: HttpClient,
  ) {
  }

  /** Getting SearchId */
  fetchSearchId(): Observable<string> {
    return this.httpClient.get<{searchId: string}>(`search`).pipe(
      pluck('searchId'),
    );
  }

  /** Getting a list of tickets */
  fetchListTickets(id): Observable<TicketsInterface> {
    const params = new HttpParams({
      fromObject: {
        searchId: id,
      }
    });

    return this.httpClient.get<TicketsInterface>(`tickets`, {params});
  }

}

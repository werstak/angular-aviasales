import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TicketsParamsInterface } from '../interfaces/tickets-params.interface';


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
  fetchSearchId(): Observable<{ [key: string]: string }> {
    return this.httpClient
      .get<{ [key: string]: string }>(`search`);
  }

  /** Getting a list of tickets */
  fetchListTickets(): Observable<{ [key: string]: string }> {
    return this.httpClient
      .get<{ [key: string]: string }>(`tickets?searchId=1o5cl`);
      // .get<{ [key: string]: string }>(`search`);
  }

}

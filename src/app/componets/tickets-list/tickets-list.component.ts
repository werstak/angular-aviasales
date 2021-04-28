import { Component, OnInit } from '@angular/core';
// import * as moment from 'moment';

import { Store } from '@ngrx/store';
import { selectTickets } from '../../store/tickets/tickets.selectors';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

/*  dataTickets$ = this.store.select(selectTickets);

  constructor(
    public store: Store
  ) {
  }*/

  ngOnInit(): void {
  }

}

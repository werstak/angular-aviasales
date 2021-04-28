import { Component, OnInit } from '@angular/core';
import { CheckboxFilterInterface } from '../../interfaces/checkbox-filter.interface';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { selectTickets } from '../../store/tickets/tickets.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selected: MatButtonToggle | MatButtonToggle[];

  filters: CheckboxFilterInterface[] = [
    {name: 'all', title: 'Все'},
    {name: 'without-transfers', title: 'Без пересадок'},
    {name: 'one-transfers', title: '1 пересадка'},
    {name: 'two-transfers', title: '2 пересадки'},
    {name: 'trre-transfers', title: '3 пересадки'},
  ];

  dataTickets$ = this.store.select(selectTickets);

  constructor(
    public store: Store
  ) {
  }

  ngOnInit(): void {
  }

}

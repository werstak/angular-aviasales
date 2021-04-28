import { Component, OnInit } from '@angular/core';

import { MatButtonToggle } from '@angular/material/button-toggle';

import { Store } from '@ngrx/store';
import { selectTickets } from '../../store/tickets/tickets.selectors';
import { FilterInterface } from '../../interfaces/filter.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selected: MatButtonToggle | MatButtonToggle[];
  dataTickets$ = this.store.select(selectTickets);

  filters: FilterInterface = {
    name: 'all',
    title: 'Все',
    completed: false,
    subfilters: [
      {name: 'without-transfers', title: 'Без пересадок', completed: false},
      {name: 'one-transfers', title: '1 пересадка', completed: false},
      {name: 'two-transfers', title: '2 пересадки', completed: false},
      {name: 'trre-transfers', title: '3 пересадки', completed: false}
    ]
  };

  allComplete = false;

  constructor(
    public store: Store
  ) {
  }

  updateAllComplete(): void  {
    this.allComplete = this.filters.subfilters != null && this.filters.subfilters.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.filters.subfilters == null) {
      return false;
    }
    return this.filters.subfilters.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean): void  {
    this.allComplete = completed;
    if (this.filters.subfilters == null) {
      return;
    }
    this.filters.subfilters.forEach(t => t.completed = completed);
  }


}

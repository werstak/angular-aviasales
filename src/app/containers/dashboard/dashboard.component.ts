import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatButtonToggle } from '@angular/material/button-toggle';

import { Store } from '@ngrx/store';
import { selectTickets } from '../../store/tickets/tickets.selectors';
import { FilterInterface } from '../../interfaces/filter.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataTickets$ = this.store.select(selectTickets);

  filterForm: FormGroup;

  selected: MatButtonToggle | MatButtonToggle[];

  filters: FilterInterface = {
    name: 'all',
    title: 'Все',
    completed: false,
    formControlName: 'all',
    subfilters: [
      {name: 'without-transfers', title: 'Без пересадок', completed: false, formControlName: 'withoutTransfers'},
      {name: 'one-transfers', title: '1 пересадка', completed: false, formControlName: 'oneTransfers'},
      {name: 'two-transfers', title: '2 пересадки', completed: false, formControlName: 'twoTransfers'},
      {name: 'three-transfers', title: '3 пересадки', completed: false, formControlName: 'threeTransfers'}
    ]
  };

  allComplete = false;

  constructor(
    public store: Store,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.filterForm = this.fb.group({
      all: [''],
      withoutTransfers: [''],
      oneTransfers: [''],
      twoTransfers: [''],
      threeTransfers: ['']
    });
  }

  filterCheck(): void {
    const params = this.filterForm.value;
    console.log('form.value', params);
  }

  updateAllComplete(): void {
    this.allComplete = this.filters.subfilters != null && this.filters.subfilters.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.filters.subfilters == null) {
      return false;
    }
    return this.filters.subfilters.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean): void {
    this.allComplete = completed;
    if (this.filters.subfilters == null) {
      return;
    }
    this.filters.subfilters.forEach(t => t.completed = completed);
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { selectFilters, selectTickets } from '../../store/tickets/tickets.selectors';
import { FilterInterface } from '../../interfaces/filter.interface';
import { filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataTickets$ = this.store.select(selectTickets).pipe(
    filter(res => !!res.length),
    map((res) => {
      return [res[0], res[1], res[2]];
    })
  );

  filterForm: FormGroup;

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

  indeterminate$ = new Subject<boolean>();

  constructor(
    public store: Store,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.filterForm.get('all').valueChanges.subscribe((allChecked: boolean) => {
      this.filterForm.get('filter').patchValue({
        withoutTransfers: allChecked,
        oneTransfers: allChecked,
        twoTransfers: allChecked,
        threeTransfers: allChecked
      });
    });

    this.filterForm.get('filter').valueChanges.subscribe(fields => {
      const values = Object.values(fields);
      const allChecked = values.every(value => value);
      const allUnchecked = values.every(value => !value);
      const isIndeterminate = !(allChecked || allUnchecked);

      this.indeterminate$.next(isIndeterminate);
      this.filterForm.get('all').patchValue(allChecked, {emitEvent: false});
    });
  }

  private buildForm(): void {
    this.filterForm = this.fb.group({
      all: [false],
      filter: this.fb.group({
        withoutTransfers: [''],
        oneTransfers: [''],
        twoTransfers: [''],
        threeTransfers: ['']
      })
    });
  }

  // filterCheck(): void {
  //   const params = this.filterForm.value;
  //   console.log('form.value', params);
  //
  //   this.filtersTickets$ = this.store.select(selectFilters, {params});
  //   console.log('filtersTickets', this.filtersTickets$);
  // }
}

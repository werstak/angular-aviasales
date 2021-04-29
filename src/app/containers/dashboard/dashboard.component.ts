import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { startWith, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectTickets } from '../../store/tickets/tickets.selectors';
import { FilterInterface } from '../../interfaces/filter.interface';
import { TicketInterface } from '../../interfaces/ticket.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataTickets$: Observable<TicketInterface[]>;

  filterForm: FormGroup;

  filters: FilterInterface = {
    title: 'Все',
    completed: false,
    formControlName: 'all',
    subfilters: [
      {title: 'Без пересадок', completed: false, formControlName: 'withoutTransfers'},
      {title: '1 пересадка', completed: false, formControlName: 'oneTransfers'},
      {title: '2 пересадки', completed: false, formControlName: 'twoTransfers'},
      {title: '3 пересадки', completed: false, formControlName: 'threeTransfers'}
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

    // console.log(this.filterForm.value);

    this.dataTickets$ = this.filterForm.valueChanges
      .pipe(
        startWith(this.filterForm.value as Record<string, unknown>),
        switchMap(values => {
          return this.store.select(selectTickets, {
            filters: values.filter,
            limit: values.limit,
          });
        }),
      );
  }

  private buildForm(): void {
    this.filterForm = this.fb.group({
      all: [true],
      limit: [5],
      sort: [1],
      filter: this.fb.group({
        withoutTransfers: [true],
        oneTransfers: [true],
        twoTransfers: [true],
        threeTransfers: [true],
      }),
    });
  }

  sortTickets(value: number, ): void {
    const sortControl = this.filterForm.get('sort');
    sortControl.patchValue(value);
    console.log(this.filterForm.value);

  }

  addMore(value: number): void {
    const limitControl = this.filterForm.get('limit');
    limitControl.patchValue(limitControl.value + value);
  }
}

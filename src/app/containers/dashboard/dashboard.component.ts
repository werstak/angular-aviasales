import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { startWith, switchMap } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectAllTickets, selectTickets } from '../../store/tickets/tickets.selectors';
import { FilterInterface } from '../../interfaces/filter.interface';
import { TicketInterface } from '../../interfaces/ticket.interface';
import { SortInterface } from '../../interfaces/sort.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dataTickets$: Observable<TicketInterface[]>;
  indeterminate$ = new Subject<boolean>();
  allTickets$ = this.store.select(selectAllTickets);

  filterForm: FormGroup;
  totalCounter: number;
  displayTickets: number;

  unsub: Subscription;

  sortBtnItems: SortInterface [] = [
    {title: 'The cheapest', value: 'cheap'},
    {title: 'The fastest', value: 'fast'},
  ];

  filterCheckboxItems: FilterInterface = {
    title: 'All',
    completed: false,
    formControlName: 'all',
    subFilters: [
      {title: 'Direct', completed: false, formControlName: 'withoutTransfers'},
      {title: '1 Stop', completed: false, formControlName: 'oneTransfers'},
      {title: '2 Stops', completed: false, formControlName: 'twoTransfers'},
      {title: '3 Stops', completed: false, formControlName: 'threeTransfers'}
    ]
  };


  constructor(
    public store: Store,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.unsub = this.allTickets$.subscribe({
      next: count => {
        this.totalCounter = count.length;
        return this.totalCounter;
      },
    });

    this.unsub = this.filterForm.get('all').valueChanges.subscribe((allChecked: boolean) => {
      this.filterForm.get('filter').patchValue({
        withoutTransfers: allChecked,
        oneTransfers: allChecked,
        twoTransfers: allChecked,
        threeTransfers: allChecked
      });
    });

    this.unsub = this.filterForm.get('filter').valueChanges.subscribe(fields => {
      const values = Object.values(fields);
      const allChecked = values.every(value => value);
      const allUnchecked = values.every(value => !value);
      const isIndeterminate = !(allChecked || allUnchecked);

      this.indeterminate$.next(isIndeterminate);
      this.filterForm.get('all').patchValue(allChecked, {emitEvent: false});
    });

    this.dataTickets$ = this.filterForm.valueChanges
      .pipe(
        startWith(this.filterForm.value as Record<string, unknown>),
        switchMap(values => {
          return this.store.select(selectTickets, {
            filters: values.filter,
            limit: values.limit,
            sort: values.sort,
          });
        }),
      );

    this.unsub = this.dataTickets$.subscribe({
      next: count => {
        this.displayTickets = count.length;
      },
    });
  }

  private buildForm(): void {
    this.filterForm = this.fb.group({
      all: [true],
      limit: [5],
      sort: [''],
      filter: this.fb.group({
        withoutTransfers: [true],
        oneTransfers: [true],
        twoTransfers: [true],
        threeTransfers: [true],
      }),
    });
  }

  sortTickets(value: string): void {
    const sortControl = this.filterForm.get('sort');
    sortControl.patchValue(value);
  }

  displayMore(value: number): void {
    const limitControl = this.filterForm.get('limit');
    limitControl.patchValue(limitControl.value + value);
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}

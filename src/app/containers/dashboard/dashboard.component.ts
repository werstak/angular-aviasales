import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { map, startWith, switchMap } from 'rxjs/operators';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';

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
  filterForm: FormGroup;
  totalCounter$: Observable<number>;
  displayTickets$: Observable<number>;
  isShowMore$: Observable<boolean>;
  indeterminate$ = new Subject<boolean>();

  allTickets$ = this.store.select(selectAllTickets);

  unsubFormAllChecked: Subscription;
  unsubFormFields: Subscription;

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

    this.unsubFormAllChecked = this.filterForm.get('all').valueChanges.subscribe((allChecked: boolean) => {
      this.filterForm.get('filter').patchValue({
        withoutTransfers: allChecked,
        oneTransfers: allChecked,
        twoTransfers: allChecked,
        threeTransfers: allChecked
      });
    });

    this.unsubFormFields = this.filterForm.get('filter').valueChanges.subscribe(fields => {
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

    this.displayTickets$ = this.dataTickets$.pipe(
      map(tickets => tickets.length)
    );

    this.totalCounter$ = this.allTickets$.pipe(
      map(tickets => tickets.length)
    );

    this.isShowMore$ = combineLatest([
      this.displayTickets$,
      this.totalCounter$
    ])
      .pipe(
        map(([display, total]) => display === 0 || display === total || display > total)
      );
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
    this.unsubFormAllChecked.unsubscribe();
    this.unsubFormFields.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchSearchIdAction } from './store/tickets/tickets.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-aviasales';

  constructor(
    public store: Store,
  ) {
    this.store.dispatch(fetchSearchIdAction());
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SidebarFilterComponent } from './componets/sidebar-filter/sidebar-filter.component';
import { TicketDashboardComponent } from './containers/ticket-dashboard/ticket-dashboard.component';
import { TicketsListComponent } from './componets/tickets-list/tickets-list.component';
import { HeadFilterComponent } from './componets/head-filter/head-filter.component';
import { FormsModule } from '@angular/forms';

import { TicketsService } from './services/tickets.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CurrencyEffects } from './store/tickets/tickets.effects';
import { ticketsReducer } from './store/tickets/tickets.reducer';
import { BaseUrlInterceptor } from './core/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarFilterComponent,
    TicketDashboardComponent,
    TicketsListComponent,
    HeadFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({tickets: ticketsReducer}),
    EffectsModule.forRoot([CurrencyEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  ],
  providers: [
    TicketsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseUrlInterceptor } from './core/api.interceptor';

import { TicketsService } from './services/tickets.service';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TicketsEffects } from './store/tickets/tickets.effects';
import { ticketsReducer } from './store/tickets/tickets.reducer';
import { ConverterTimePipe } from './pipes/converter-time.pipe';
import { ConverterTimeArrivalPipe } from './pipes/converter-time-arrival.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConverterTimePipe,
    ConverterTimeArrivalPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({tickets: ticketsReducer}),
    EffectsModule.forRoot([TicketsEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  ],
  providers: [
    TicketsService,
    ConverterTimePipe,
    ConverterTimeArrivalPipe,
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

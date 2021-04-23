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
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

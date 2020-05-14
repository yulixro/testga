import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InmemoryDataService } from './inmemory-data.service';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';



import { GoogleAnalyticsService } from './google-analytics.service';

export const environmentToken = new InjectionToken('ENVIRONMENT');

declare let gtag: any;

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InmemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    {provide: environmentToken, useValue: environment},
    GoogleAnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(environmentToken) private env: any) {
    gtag('config', this.env.google.GA_TRACKING_ID, {
      custom_map: {
        dimension1: 'category',
        dimension2: 'user',
        metric1: 'test',
        metric2: 'ddd',
        metric3: 'ccc'
      },
      site_speed_sample_rate: 100
    });
  }
}

import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { StringToHourPipe } from './pipes/string-to-hour.pipe';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { IsEvenPipe } from './pipes/is-even.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StringToDatePipe,
    StringToHourPipe,
    WeatherDetailsComponent,
    IsEvenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LocationService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

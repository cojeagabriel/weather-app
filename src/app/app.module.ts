import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { StringToHourPipe } from './pipes/string-to-hour.pipe';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { IsEvenPipe } from './pipes/is-even.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringToDayPipe } from './pipes/string-to-day.pipe';
import { CelsiusToFahrenheitPipe } from './pipes/celsius-to-fahrenheit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StringToDatePipe,
    StringToHourPipe,
    WeatherDetailsComponent,
    IsEvenPipe,
    StringToDayPipe,
    CelsiusToFahrenheitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [
    LocationService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { WeatherService } from './../../services/weather.service';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../types/location';
import { shareReplay, switchMap, map, filter } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  location$: Observable<any>;
  weather$: Observable<any>;
  currentWeather$: Observable<any>

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.location$ = this.locationService.getLocation().pipe(
      shareReplay(1)
    );

    this.weather$ = this.location$.pipe(
      shareReplay(1),
      switchMap(location => this.weatherService.getWetherByCityKey(location.Key).pipe(
        map(weatherList => {
          return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0 )
        })
      ))
    )

    this.currentWeather$ = this.weather$.pipe(
      map(weather => {
       return weather[0];
      })
    )

  }

  

}

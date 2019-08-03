import { WeatherService } from './../../services/weather.service';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from '../../types/location';
import { shareReplay, switchMap, map, filter, startWith, take, tap, last, withLatestFrom } from 'rxjs/operators';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  location$: Observable<any>;
  weather$: Observable<any>;
  weatherByDays$: Observable<any>;

  getCurrentWeather$: Subject<any> = new Subject<null>();
  currentWeather$: Observable<any>

  city = new FormControl();
  options: Observable<string[]>;
  generateWeather: Subject<string> = new Subject<null>();
  

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {

    this.location$ = this.generateWeather.pipe(
      shareReplay(1),
      startWith('bucharest'),
      switchMap(value => this.locationService.getLocation(value))
    )

    this.weather$ = this.location$.pipe(
      shareReplay(1),
      switchMap(location => this.weatherService.getWether({ CityKey: location.Key }).pipe(
        tap(weatherList => {
          this.getCurrentWeather$.next(weatherList[0]);
        })
      ))
    );

    this.weatherByDays$ = this.location$.pipe(
      shareReplay(1),
      switchMap(location => this.weatherService.getWether({CityKey: location.Key, Type: 'days'}))
    );

    this.currentWeather$ = this.getCurrentWeather$.pipe(
      shareReplay(1)
    );

    this.options = this.city.valueChanges.pipe(
      switchMap(value => this.locationService.getAutocompleteLocations(value))
    );
    
    // this.currentWeather$ = this.getCurrentWeather$.pipe(
    //   shareReplay(1),
    //   map(weather => {
    //     console.log(weather);
    //    return weather;
    //   })
    // );

    // this.currentWeather$ = this.weather$.pipe(
    //   shareReplay(1),
    //   map(weather => {
    //    return weather[0];
    //   })
    // );

    // this.options = this.city.valueChanges.pipe(
    //   shareReplay(1),
    //   startWith(''),
    //   switchMap(value => {
    //     return this.locationService.getAutocompleteLocations(value).pipe(
    //       tap(locations => {
    //         this.generateWeather.next(locations[0].LocalizedName);
    //       })
    //     )
    //   })
    // ) as Observable<any>;
    
  }

  selectOption(value: string){
    this.generateWeather.next(value);
  }

  trackByFn(index){
    return index;
  }

}

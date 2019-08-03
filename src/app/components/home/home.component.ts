import { WeatherService } from './../../services/weather.service';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from '../../types/location';
import { shareReplay, switchMap, map, filter, startWith, take, tap } from 'rxjs/operators';
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
  currentWeather$: Observable<any>

  city = new FormControl();
  options: Observable<string[]>;
  generateWeather: Subject<string> = new Subject<null>();
  

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.city.setValue('Bucharest');
    this.location$ = this.generateWeather.pipe(
      shareReplay(1),
      startWith('bucharest'),
      switchMap(value => {
        return this.locationService.getLocation(value.toLowerCase());
      })
    )

    this.weatherByDays$ = this.location$.pipe(
      shareReplay(1),
      switchMap(location => {
        console.log(location.Key);
        return this.weatherService.getWetherByCityKey({CityKey: location.Key, Type: 'days'});
      })
    );

    this.weather$ = this.location$.pipe(
      shareReplay(1),
      switchMap(location => {
        console.log(location.Key);
        return this.weatherService.getWetherByCityKey({CityKey: location.Key}).pipe(
          map(weatherList => {
            return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0 );
          })
        );
      })
    );

    this.currentWeather$ = this.weather$.pipe(
      shareReplay(1),
      map(weather => {
       return weather[0];
      })
    );

    this.city.valueChanges.pipe(
      switchMap(value => {
        console.log("here");
        if(!value.lenth)
          return 'Bucharest'
      })
    )

    this.options = this.city.valueChanges.pipe(
      shareReplay(1),
      startWith(''),
      switchMap(value => {
        return this.locationService.getAutocompleteLocations(value).pipe(
          tap(locations => {
            this.generateWeather.next(locations[0].LocalizedName);
          })
        )
      })
    ) as Observable<any>;
    
  }

  test(){
    if(!this.city.value.length){
      this.city.setValue('Beijing');
      this.generateWeather.next('Beijing');
    }
  }

  trackByFn(index){
    return index;
  }

}

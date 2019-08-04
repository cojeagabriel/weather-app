import { WeatherService } from './../../services/weather.service';
import { LocationService } from './../../services/location.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap, map, filter, startWith, take, tap, last, withLatestFrom, first } from 'rxjs/operators';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  location: string;
  location$: Observable<any>;
  weather$: Observable<any>;
  weatherByDays$: Observable<any>;

  currentWeather$: Observable<any>

  city = new FormControl();
  options: Observable<string[]>;

  generateWeather: Subject<string> = new Subject<null>();

  metric: string = 'C';
  metric$: Observable<string>;

  lastUpdate$: Observable<string>;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {

    this.location$ = this.generateWeather.pipe(
      startWith('bucharest'),
      switchMap(location => {
        this.location = location;
        return this.locationService.getLocation(location);
      }),
      shareReplay(1)
    );

    this.location$.subscribe();

    this.weather$ = this.location$.pipe(
      switchMap(location => this.weatherService.getWeather({ CityKey: location.Key, Type: 'hourly' })),
      shareReplay(1)
    );

    this.weatherByDays$ = this.location$.pipe(
      switchMap(location => this.weatherService.getWeather({CityKey: location.Key, Type: 'daily'})),
      shareReplay(1)
    );

    this.options = this.city.valueChanges.pipe(
      switchMap(value => this.locationService.getAutocompleteLocations(value))
    );

    this.currentWeather$ = this.location$.pipe(
      switchMap(location => this.weatherService.getCurrentWeather(location.Key)),
      shareReplay(1)
    );

    this.metric$ = this.weatherService.getMetric();

    this.lastUpdate$ = this.currentWeather$.pipe(
      map(value => moment().format('hh:mm:ss'))
    )

  }

  selectOption(value: string){
    this.generateWeather.next(value);
  }

  trackByFn(index){
    return index;
  }

  toggleMetric(){
    this.weatherService.toggleMetric();
    this.weatherService.getMetric().pipe(
      take(1),
      untilDestroyed(this)
    ).subscribe(metric => {
      this.metric = metric;
    });
  }

  refresh(){
    this.generateWeather.next(this.location);
  }

  ngOnDestroy(){
  }


}

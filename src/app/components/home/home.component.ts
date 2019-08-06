import { WeatherService } from './../../services/weather.service';
import { LocationService } from './../../services/location.service';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap, map, startWith, take } from 'rxjs/operators';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatInput } from '@angular/material';

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

  currentWeather$: Observable<any>;

  city = new FormControl();
  options: Observable<string[]>;

  generateWeather: Subject<string> = new Subject<null>();

  metric: string;

  lastUpdate$: Observable<string>;

  @ViewChild(MatInput, { static: false }) searchInput: MatInput;
  searchFocus = false;

  defaultImage = '/assets/images/background3-lazy.jpg';
  image = '/assets/images/background3.jpg';

  apiKey$: Observable<string>;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.city.setValue('');
    this.metric = 'C';

    this.location$ = this.generateWeather.pipe(
      startWith('bucharest'),
      switchMap(location => {
        this.location = location;
        return this.locationService.getLocation(location);
      }),
      shareReplay(1)
    );

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

    this.lastUpdate$ = this.currentWeather$.pipe(
      map(value => moment().format('hh:mm:ss'))
    );

  }

  selectOption(value: string): void {
    this.generateWeather.next(value);
  }

  trackByFn(index: any) {
    return index;
  }

  toggleMetric(): void {
    if (this.metric === 'C') {
      this.metric = 'F';
    } else {
      this.metric = 'C';
    }
  }

  refresh(): void {
    this.generateWeather.next(this.location);
  }

  searchClick() {
    if (this.city.value !== '') {
      this.city.setValue('');
    }
    if (this.searchFocus === false) {
      this.changeDetector.detectChanges();
      setTimeout(() => {
        this.searchInput.focus();
      }, 0);
    }
  }

  searchBlur(): void {
    this.searchFocus = false;
  }

  searchInputFocus(): void {
    this.searchFocus = true;
  }

  ngOnDestroy(): void {

  }

}

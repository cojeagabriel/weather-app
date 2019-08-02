import { WeatherService } from './../../services/weather.service';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../types/location';
import { shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  location$: Observable<any>;
  weather$: Observable<Object>;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.location$ = this.locationService.getLocation().pipe(
      shareReplay(1)
    );

    this.weather$ = this.location$.pipe(
      switchMap(location => this.weatherService.getWetherByCityKey(location.Key))
    )
  }

}

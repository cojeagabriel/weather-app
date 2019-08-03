import { WeatherFilters } from './../types/weather-filters.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  metric = 'C';
  metricChange$: Subject<string> = new Subject<null>();

  constructor(
    private http: HttpClient
  ) {

  }

  getWether(weatherFilters: WeatherFilters): Observable<any> {
    if(weatherFilters.Type != undefined) {
      switch (weatherFilters.Type) {
        case 'hourly':
          return this.http.get(`${environment.api}/forecasts/v1/hourly/12hour/${weatherFilters.CityKey}?apikey=${environment.apiKey}&metric=true`).pipe(
            map(weatherList => {
              return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
            })
          );
          break;
      
        case 'daily':
          return this.http.get(`${environment.api}/forecasts/v1/daily/5day/${weatherFilters.CityKey}?apikey=${environment.apiKey}&metric=true`);
          break;
      
        default:
          return this.http.get(`${environment.api}/forecasts/v1/hourly/12hour/${weatherFilters.CityKey}?apikey=${environment.apiKey}&metric=true`).pipe(
            map(weatherList => {
              return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
            })
          );
          break;
      }
    }
  }

  // getWether(weatherFilters: WeatherFilters): Observable<any> {
  //   // return (this.http.get(`${environment.api}/locations/v1/cities/search?apikey=${environment.apiKey}&q=${city}`) as Observable<Object>).pipe(    
  //   if(typeof weatherFilters.Type != 'undefined'){
  //     switch (weatherFilters.Type) {
  //       case "hourly":
  //         return this.http.get('../../assets/data/weather-12h.json').pipe(
  //           map(weatherList => {
  //             return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //           })
  //         ) as Observable<any>;
  //         break;
  //       case "daily":
  //         return (this.http.get('../../assets/data/weather-5days.json') as Observable<Object>);
  //         break;
  //       default:
  //         return this.http.get('../../assets/data/weather-12h.json').pipe(
  //           map(weatherList => {
  //             return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //           })
  //         ) as Observable<any>;
  //         break;
  //     }
  //   }

  //   if (weatherFilters.CityKey == "101924"){
  //     return this.http.get('../../assets/data/weather-12h-beijing.json').pipe(
  //       map(weatherList => {
  //         return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //       })
  //     ) as Observable<any>;
  //   }
  //   else return this.http.get('../../assets/data/weather-12h.json').pipe(
  //     map(weatherList => {
  //       return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //     })
  //   ) as Observable<any>;
  // }

  getMetric(): Observable<string> {
    return this.metricChange$.pipe(
      startWith(this.metric)
    );
  }

  toggleMetric() {
    if (this.metric == 'C') {
      this.metric = 'F';
      this.metricChange$.next(this.metric);
    } else {
      this.metric = 'C';
      this.metricChange$.next(this.metric);
    }
  }

}

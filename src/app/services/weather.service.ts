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

  getCurrentWeather(CityKey: string): Observable<any>{
    return this.http.get(`${environment.api}/currentconditions/v1/${CityKey}?apikey=${environment.apiKey}&details=true`).pipe(
      map(currentWeather => currentWeather[0])
    );
  }

  getWeather(weatherFilters: WeatherFilters): Observable<any> {
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

  // getCurrentWeather(Key: string): Observable<any>{
  //   switch (Key) {
  //     case '287430':
  //       return this.http.get('../../assets/data/weather-current-time-bucharest.json').pipe(
  //         map(weather => {
  //           return weather[0];
  //         })
  //       ) as Observable<any>;
  //       break;
    
  //     case '287345':
  //       return this.http.get('../../assets/data/weather-current-time-brasov.json').pipe(
  //         map(weather => {
  //           return weather[0];
  //         })
  //       ) as Observable<any>;
  //       break;
    
  //     case '101924':
  //       return this.http.get('../../assets/data/weather-current-time-beijing.json').pipe(
  //         map(weather => {
  //           return weather[0];
  //         })
  //       ) as Observable<any>;
  //       break;
    
  //     default:
  //       return this.http.get('../../assets/data/weather-current-time-bucharest.json').pipe(
  //         map(weather => {
  //           return weather[0];
  //         })
  //       ) as Observable<any>;
  //       break;
  //   }
    
  // }

  // getWeather(weatherFilters: WeatherFilters): Observable<any> {
  //   switch (weatherFilters.CityKey) {
  //     case '287430':
  //       switch (weatherFilters.Type) {
  //         case "hourly":
  //           return this.http.get('../../assets/data/weather-12h-bucharest.json').pipe(
  //             map(weatherList => {
  //               return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //             })
  //           ) as Observable<any>;
  //           break;
  //         case "daily":
  //           return (this.http.get('../../assets/data/weather-5days-bucharest.json') as Observable<Object>);
  //           break;
  //         default:
  //           return this.http.get('../../assets/data/weather-12h-bucharest.json').pipe(
  //             map(weatherList => {
  //               return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //             })
  //           ) as Observable<any>;
  //           break;
  //       }
  //       break;

  //     case '287345':
  //       switch (weatherFilters.Type) {
  //         case "hourly":
  //           return this.http.get('../../assets/data/weather-12h-brasov.json').pipe(
  //             map(weatherList => {
  //               return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //             })
  //           ) as Observable<any>;
  //           break;
  //         case "daily":
  //           return (this.http.get('../../assets/data/weather-5days-brasov.json') as Observable<Object>);
  //           break;
  //         default:
  //           return this.http.get('../../assets/data/weather-12h-brasov.json').pipe(
  //             map(weatherList => {
  //               return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //             })
  //           ) as Observable<any>;
  //           break;
  //       }
  //       break;

  //     case '101924':
  //       switch (weatherFilters.Type) {
  //         case "hourly":
  //           return this.http.get('../../assets/data/weather-12h-beijing.json').pipe(
  //             map(weatherList => {
  //               return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //             })
  //           ) as Observable<any>;
  //           break;
  //         case "daily":
  //           return (this.http.get('../../assets/data/weather-5days-beijing.json') as Observable<Object>);
  //           break;
  //         default:
  //           return this.http.get('../../assets/data/weather-12h-beijing.json').pipe(
  //             map(weatherList => {
  //               return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //             })
  //           ) as Observable<any>;
  //           break;
  //       }
  //       break;

  //     default:
  //       switch (weatherFilters.Type) {
  //         case "hourly":
  //           return this.http.get('../../assets/data/weather-12h-bucharest.json').pipe(
  //             map(weatherList => {
  //               return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //             })
  //           ) as Observable<any>;
  //           break;
  //         case "daily":
  //           return (this.http.get('../../assets/data/weather-5days-bucharest.json') as Observable<Object>);
  //           break;
  //         default:
  //           return this.http.get('../../assets/data/weather-12h-bucharest.json').pipe(
  //             map(weatherList => {
  //               return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
  //             })
  //           ) as Observable<any>;
  //           break;
  //       }
  //       break;
  //   }
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

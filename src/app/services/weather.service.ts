import { WeatherFilters } from './../types/weather-filters.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWether(weatherFilters: WeatherFilters): Observable<any> {
    // return (this.http.get(`${environment.api}/locations/v1/cities/search?apikey=${environment.apiKey}&q=${city}`) as Observable<Object>).pipe(    
    if(typeof weatherFilters.Type != 'undefined'){
      switch (weatherFilters.Type) {
        case "hours":
          return this.http.get('../../assets/data/weather-12h.json').pipe(
            map(weatherList => {
              return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
            })
          ) as Observable<any>;
          break;
        case "days":
          return (this.http.get('../../assets/data/weather-5days.json') as Observable<Object>);
          break;
        default:
          return this.http.get('../../assets/data/weather-12h.json').pipe(
            map(weatherList => {
              return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
            })
          ) as Observable<any>;
          break;
      }
    }

    if (weatherFilters.CityKey == "101924"){
      return this.http.get('../../assets/data/weather-12h-beijing.json').pipe(
        map(weatherList => {
          return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
        })
      ) as Observable<any>;
    }
    else return this.http.get('../../assets/data/weather-12h.json').pipe(
      map(weatherList => {
        return (weatherList as Array<any>).filter((weather, index) => index % 2 == 0).slice(0, 5);
      })
    ) as Observable<any>;
  }
}

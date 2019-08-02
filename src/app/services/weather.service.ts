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

  getWetherByCityKey(weatherFilters: WeatherFilters): Observable<Object> {
    // return (this.http.get(`${environment.api}/locations/v1/cities/search?apikey=${environment.apiKey}&q=${city}`) as Observable<Object>).pipe(    
    if(typeof weatherFilters.Type != 'undefined'){
      switch (weatherFilters.Type) {
        case "hours":
          return (this.http.get('../../assets/data/weather-12h.json') as Observable<Object>);
          break;
        case "days":
          return (this.http.get('../../assets/data/weather-5days.json') as Observable<Object>);
          break;
        default:
          return (this.http.get('../../assets/data/weather-12h.json') as Observable<Object>);
          break;
      }
    }

    if (weatherFilters.CityKey == "101924"){
      return (this.http.get('../../assets/data/weather-12h-beijing.json') as Observable<Object>);
    }
    else return (this.http.get('../../assets/data/weather-12h.json') as Observable<Object>);
  }
}

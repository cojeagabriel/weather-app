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

  getWetherByCityKey(cityKey: string): Observable<Object> {
    // return (this.http.get(`${environment.api}/locations/v1/cities/search?apikey=${environment.apiKey}&q=${city}`) as Observable<Object>).pipe(
    return (this.http.get('../../assets/data/weather-12h.json') as Observable<Object>);
  }
}

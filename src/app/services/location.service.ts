import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../types/location';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // location: Location = {
  //   Key: '',
  //   LocalizedName: '',
  //   Country: null
  // }

  constructor(
    private http: HttpClient
  ) { }

  // getLocation(city:string = "bucharest"): Observable<any>{
  //   return this.http.get(`${environment.api}/locations/v1/cities/search?apikey=${environment.apiKey}&q=${city}`).pipe(
  //     map(location => {
  //       return location[0];
  //     })
  //   );
  // }

  // getAutocompleteLocations(str: string): Observable<any>{
  //   if(str.length)
  //     return this.http.get(`${environment.api}/locations/v1/cities/autocomplete?apikey=${environment.apiKey}&q=${str}`);
  //   return this.http.get(`${environment.api}/locations/v1/cities/autocomplete?apikey=${environment.apiKey}&q=Bucharest`);
  // }

  getLocation(city: string = "bucharest"): Observable<any> {
    return (this.http.get(`../../assets/data/location-${city.toLowerCase()}.json`) as Observable<any>).pipe(
      map(location => {
        return location[0];
      })
    );
  }

  getAutocompleteLocations(str: string): Observable<any>{
    if(str.length)
      return (this.http.get(`../../assets/data/location-autocomplete-${str.toLowerCase()}.json`) as Observable<any>);
    return (this.http.get('../../assets/data/location-bucharest.json') as Observable<any>);
  }
  
}

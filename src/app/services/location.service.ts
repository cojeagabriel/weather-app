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

  getLocation(city:string = "Bucharest"): Observable<Object>{
    // return (this.http.get(`${environment.api}/locations/v1/cities/search?apikey=${environment.apiKey}&q=${city}`) as Observable<Object>).pipe(
    return (this.http.get('../../assets/data/location.json') as Observable<Object>).pipe(
      map(location => {
        return location[0];
      })
    );
  }

  // getLocation(city:string = "Bucharest"): Observable<Location>{
  //   return (this.http.get('../../assets/data/location.json') as Observable<Location>).pipe(
  //     map(location => {

  //       for (var property in location[0]) {
  //         if (this.location.hasOwnProperty(property)) {
  //           this.location[property] = location[0][property];
  //         }
  //       }
  //       // let picked = (({ Key, LocalizedName }) => ({ Key, LocalizedName }))(location[0]);
  //       console.log(JSON.parse(JSON.stringify(this.location)));
  //       return this.location;
  //     })
  //   );
  // }

}

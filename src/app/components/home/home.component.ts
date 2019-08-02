import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../types/location';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  location$: Observable<Object>

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.location$ = this.locationService.getLocation().pipe(
      shareReplay(1)
    );
  }

}

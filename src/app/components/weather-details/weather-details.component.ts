import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  @Input() weather: any;
  @Input() type: string;
  @Input() metric: string;

  constructor(
  ) { }

  ngOnInit() {
  }

}

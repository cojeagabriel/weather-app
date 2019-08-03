import { StringToHourPipe } from './../../pipes/string-to-hour.pipe';
import { WeatherDetailsInfo } from './../../types/weather-details-info.d';
import { Component, OnInit, Input } from '@angular/core';
import { StringToDatePipe } from 'src/app/pipes/string-to-date.pipe';
import { StringToDayPipe } from 'src/app/pipes/string-to-day.pipe';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  providers: [StringToHourPipe, StringToDatePipe, StringToDayPipe ]
})
export class WeatherDetailsComponent implements OnInit {

  //  weather: any;
  @Input() type: string;

  weatherInfo: WeatherDetailsInfo = {
    Label: '',
    IconUrls: null,
    Temperature: null
  };

  constructor(
    private stringToDate: StringToDatePipe,
    private stringToDay: StringToDayPipe,
    private stringToHour: StringToHourPipe,
  ) { }

  ngOnInit() {
    console.log(this.type);
  }

  @Input()
  set weather(weather: any){
    if (this.type == "hour") {
      this.weatherInfo.Label = this.stringToHour.transform(weather.DateTime) + ":00";
      this.weatherInfo.IconUrls = "https://developer.accuweather.com/sites/default/files/" + (weather.WeatherIcon > 9 ? weather.WeatherIcon : "0" + weather.WeatherIcon) + "-s.png";
      this.weatherInfo.Temperature = weather.Temperature.Value;

    } else if (this.type == "day") {
      this.weatherInfo.Label = this.stringToDay.transform(weather.Date);
      this.weatherInfo.IconUrls = {
        Day: "https://developer.accuweather.com/sites/default/files/" + (weather.Day.Icon > 9 ? weather.Day.Icon : "0" + weather.Day.Icon) + "-s.png",
        Night: "https://developer.accuweather.com/sites/default/files/" + (weather.Night.Icon > 9 ? weather.Night.Icon : "0" + weather.Night.Icon) + "-s.png"
      };
      this.weatherInfo.Temperature = {
        Maximum: weather.Temperature.Maximum.Value,
        Minimum: weather.Temperature.Minimum.Value
      };
    }
  }

}

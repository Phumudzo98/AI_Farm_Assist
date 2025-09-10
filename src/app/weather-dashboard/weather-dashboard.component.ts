import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss'
})
export class WeatherDashboardComponent {
  city: string = 'Nkandla';
  currentTemp: number = 26;
  condition: string = 'Mostly Clear';

  weekForecast: any[] = [];
  selectedDay: any = null;
  dailySummary: string = '';

  ngOnInit(): void {
    this.loadForecast();
    this.selectDay(this.weekForecast[0]); 
  }

  loadForecast() {
    this.weekForecast = [
      { name: 'Today', icon: '☁️', max: 29, min: 13, humidity: '35%', condition: 'Mostly Clear', wind: 'ENE - 5.0 kt', rain: '0 mm', rainProb: '0%', sunrise: '06:11', sunset: '17:58' },
      { name: 'Tuesday', icon: '☀️', max: 29, min: 15, humidity: '30%', condition: 'Sunny', wind: 'E - 6.0 kt', rain: '0 mm', rainProb: '0%', sunrise: '06:12', sunset: '17:59' },
      { name: 'Wednesday', icon: '☀️', max: 28, min: 14, humidity: '32%', condition: 'Sunny', wind: 'NE - 4.5 kt', rain: '0 mm', rainProb: '5%', sunrise: '06:12', sunset: '18:00' },
      { name: 'Thursday', icon: '☀️', max: 31, min: 17, humidity: '40%', condition: 'Hot & Sunny', wind: 'E - 5.0 kt', rain: '0 mm', rainProb: '10%', sunrise: '06:13', sunset: '18:01' },
      { name: 'Friday', icon: '🌧️', max: 27, min: 13, humidity: '65%', condition: 'Light Rain', wind: 'SE - 7.0 kt', rain: '2 mm', rainProb: '60%', sunrise: '06:14', sunset: '18:02' },
      { name: 'Saturday', icon: '🌧️', max: 27, min: 13, humidity: '70%', condition: 'Rainy', wind: 'S - 8.0 kt', rain: '4 mm', rainProb: '80%', sunrise: '06:15', sunset: '18:03' },
      { name: 'Sunday', icon: '🌧️', max: 27, min: 13, humidity: '68%', condition: 'Rainy', wind: 'SW - 6.0 kt', rain: '3 mm', rainProb: '75%', sunrise: '06:15', sunset: '18:04' }
    ];
  }

  setFavoriteFarm() {
    alert(`${this.city} set as favorite farm location`);
  }

  viewDetailedForecast() {
    alert(`Viewing detailed forecast for ${this.selectedDay.name}`);
  }


  selectDay(day: any) {
    this.selectedDay = day;
    this.generateSummary(day);
  }

 
  generateSummary(day: any) {
    this.dailySummary =
      `${day.name} will be ${day.condition.toLowerCase()} with a high of ${day.max}°C `
      + `and a low of ${day.min}°C. Humidity around ${day.humidity}, `
      + `${day.rainProb === '0%' ? 'no rain expected' : `chance of rain at ${day.rainProb}`}.`;
  }
}
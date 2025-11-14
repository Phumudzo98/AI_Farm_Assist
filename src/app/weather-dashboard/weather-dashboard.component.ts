import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../service/environments/environment.prod';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss']
})
export class WeatherDashboardComponent {
  city: string = 'Nkandla';
  currentTemp: number = 0;
  condition: string = '';
  farmData: any;
  weekForecast: any[] = [];
  selectedDay: any = null;
  dailySummary: string = '';
  apiUrl: any = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const farmId = Number(this.route.snapshot.paramMap.get('id'));
    this.getFullForecast(farmId);
    this.getFarm(farmId);

  }

  
  getFullForecast(farmId: number) {
    const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(`${this.apiUrl}/weather/daily/${farmId}`, { headers })
      .subscribe({
        next: (data) => {
          
          this.weekForecast = data.daily.map((day: any, index: number) => ({
            name: index === 0
              ? 'Today'
              : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
            icon: this.getWeatherIcon(day.weather[0].main),
            max: Math.round(day.temp.max),
            min: Math.round(day.temp.min),
            humidity: `${day.humidity}%`,
            condition: day.weather[0].description,
            wind: `${day.wind_deg}° - ${day.wind_speed.toFixed(1)} m/s`,
            rain: day.rain ? `${day.rain} mm` : '0 mm',
            rainProb: `${Math.round(day.pop * 100)}%`,
            sunrise: new Date(day.sunrise * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            sunset: new Date(day.sunset * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          }));

         
          if (this.weekForecast.length > 0) {
            this.currentTemp = this.weekForecast[0].max;
            this.condition = this.weekForecast[0].condition;
            this.selectDay(this.weekForecast[0]);
          }
        },
        error: (err) => {
          console.error('Error fetching forecast:', err);
        }
      });
  }

  
  getFarm(farmId: number) {
    const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(`${this.apiUrl}/farm/get-farm/${farmId}`, { headers })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.farmData = data;

          this.city=data.city;
        },
        error: (error) => {
          console.error('Error fetching farm data:', error);
        }
      });
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

  
  getWeatherIcon(main: string): string {
    switch (main.toLowerCase()) {
      case 'clear': return '☀️';
      case 'clouds': return '☁️';
      case 'rain': return '🌧️';
      case 'snow': return '❄️';
      case 'thunderstorm': return '⛈️';
      default: return '🌡️';
    }
  }

  
  setFavoriteFarm() {
    alert(`${this.city} set as favorite farm location`);
  }

  
  viewDetailedForecast() {
    if (this.selectedDay) {
      alert(`Viewing detailed forecast for ${this.selectedDay.name}`);
    }
  }
}

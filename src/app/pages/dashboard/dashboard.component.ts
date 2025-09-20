import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface WeatherData {
  temperature: string;
  condition: string;
  humidity: string;
  rainfall: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  farmName: string = '';
  userProfilePic: string = '/assets/profile.jpg';
  menuOpen: boolean = false;

  weather: WeatherData = {
    temperature: '24°C',
    condition: 'Sunny',
    humidity: '55%',
    rainfall: '0mm'
  };

  aiInsights: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const farmId = Number(this.route.snapshot.paramMap.get('id'));

    // Dummy farm list
    const dummyFarms = [
      { id: 1, name: 'Farm 1', image: '/assets/farm1.jpg' },
      { id: 2, name: 'Farm 2', image: '/assets/farm2.jpg' },
      { id: 3, name: 'Farm 3', image: '/assets/farm3.jpg' }
    ];

    const farm = dummyFarms.find(f => f.id === farmId);
    this.farmName = farm ? farm.name : 'Unknown Farm';

    // Assign weather based on farm
    this.weather = this.weatherByFarm[farmId] || this.weather;

    // Generate AI insights from weather
    this.aiInsights = this.generateInsights(this.weather);
  }

  weatherByFarm: { [key: number]: WeatherData } = {
    1: { temperature: '22°C', condition: 'Cloudy', humidity: '60%', rainfall: '5mm' },
    2: { temperature: '27°C', condition: 'Sunny', humidity: '50%', rainfall: '0mm' },
    3: { temperature: '19°C', condition: 'Rainy', humidity: '80%', rainfall: '12mm' }
  };

  generateInsights(weather: WeatherData): string[] {
    const insights: string[] = [];

    // Convert strings like "55%" and "5mm" into numbers
    const humidity = parseInt(weather.humidity.replace('%', ''), 10);
    const rainfall = parseInt(weather.rainfall.replace('mm', ''), 10);

    if (weather.condition === 'Rainy' || rainfall > 5) {
      insights.push("No need to water today, enough rainfall expected.");
    } else if (weather.condition === 'Sunny' && rainfall === 0) {
      insights.push("Irrigation required, crops may dry out.");
    } else if (weather.condition === 'Cloudy' && humidity >= 60) {
      insights.push("Moisture levels are good, light irrigation may be enough.");
    } else {
      insights.push("Monitor soil moisture for best results.");
    }

    // Extra AI hints
    insights.push("Check soil nutrients for balanced growth.");
    insights.push("Inspect crops for pests after recent weather.");

    return insights;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToAddFarm() {
    console.log('Go to Add Farm');
  }
}

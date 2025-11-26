import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../service/environments/environment';
import { HttpClient } from '@angular/common/http';
import { error, log } from 'console';


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
  apiUrl = environment.apiUrl;
  farmData:any;
  id:any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const farmId = Number(this.route.snapshot.paramMap.get('id'));
    this.id=farmId;
    
    this.getFarm(farmId);
    this.getFullForecast(farmId);
    

    // Dummy farm list
    const dummyFarms = [
      { id: 1, name: 'Farm 1', image: '/assets/farm1.jpg' },
      { id: 2, name: 'Farm 2', image: '/assets/farm2.jpg' },
      { id: 3, name: 'Farm 3', image: '/assets/farm3.jpg' }
    ];

   

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

  getFarm(farmId:number)
  {
    
  const token = localStorage.getItem('token'); 

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

    this.http.get<any>(this.apiUrl+'/farm/get-farm/'+farmId, {headers}).subscribe((data)=>
    {
      console.log(data);
      this.farmData=data;
    })
  }

  getFullForecast(farmId:number)
  {

    const token = localStorage.getItem('token'); 

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.apiUrl+"/weather/daily/"+farmId, {headers}).subscribe((data)=>
    {
      console.log(data.daily[0]);
      
    }, error=>{
      console.log(error);
      
    })

    
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToAddFarm() {
    console.log('Go to Add Farm');
  }

  logout()
  {

  
  localStorage.removeItem('authToken'); 
  this.router.navigateByUrl("/login");
}

  
}

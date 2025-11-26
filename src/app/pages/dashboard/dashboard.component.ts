import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartOptions } from 'chart.js';
import Swal from 'sweetalert2';
import { environment } from '../../service/environments/environment';


interface WeatherData {
  temperature: string;
  condition: string;
  humidity: string;
  rainfall: string;
}

interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  humidity: number;
  rain?: number;
  pop: number; // probability of precipitation
  weather: { main: string; description: string; icon: string }[];
  uvi: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  id!: number;
  menuOpen = false;
  userProfilePic = '/assets/profile.jpg';

  apiUrl = environment.apiUrl;
  farmData: any = null;

  // widgets
  stats: any = {};
  statList: Array<{ label: string, value: number | null }> = [];
  lands: any[] = [];
  recentActivity: any[] = [];
  weather: WeatherData = { temperature: '—', condition: '—', humidity: '—', rainfall: '—' };
  aiInsights: string[] = [];

  // Chart
  healthChartData: ChartData<'doughnut'> = { labels: ['Good','Moderate','Critical'], datasets: [{ data: [0,0,0] }] };
  healthChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

  // counts derived from stats
  statsReady = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const farmId = Number(this.route.snapshot.paramMap.get('id'));
    this.id = farmId;

    this.getFarm(farmId);
    this.getFarmStats(farmId);
    this.getFarmLands(farmId);
    this.getRecentActivity(farmId);
    this.getFullForecast(farmId);
  }

  
  getFarm(farmId: number) {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any>(`${this.apiUrl}/farm/get-farm/${farmId}`, { headers }).subscribe({
      next: (data) => { this.farmData = data; },
      error: (err) => { console.error('getFarm error', err); }
    });
  }

  getFarmStats(farmId: number) {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    // Expected backend response example:
    // { totalLands: 4, totalCrops: 120, pestCount: 5, diseaseCount: 2, healthyCrops: 90, moderateCrops:20, criticalCrops:10 }
    this.http.get<any>(`${this.apiUrl}/farm/farm-summary/${farmId}`, { headers }).subscribe({
      next: (data) => {
        this.stats = data || {};
        this.populateStatList();
        this.updateHealthChart();
      },
      error: (err) => {
        console.error('getFarmStats error', err);
        // fallback sample
        this.stats = { totalLands:0, totalCrops:0, pestCount:0, diseaseCount:0, healthyCrops:0, moderateCrops:0, criticalCrops:0 };
        this.populateStatList();
        this.updateHealthChart();
      }
    });
  }

  getFarmLands(farmId: number) {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any>(`${this.apiUrl}/farm/get-farm-landList/${farmId}`, { headers }).subscribe({
      next: (data) => { this.lands = data || []; },
      error: (err) => { console.error('getFarmLands error', err); this.lands = []; }
    });
  }

  getRecentActivity(farmId: number) {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any>(`${this.apiUrl}/farm/recent-activity/${farmId}`, { headers }).subscribe({
      next: (data) => { this.recentActivity = data || []; },
      error: (err) => { console.error('recentActivity error', err); this.recentActivity = []; }
    });
  }
dailyWeather: DailyWeather[] = [];
todayWeather!: DailyWeather;

getFullForecast(farmId: number) {
  const token = localStorage.getItem('token'); 
  const headers = { 'Authorization': `Bearer ${token}` };

  this.http.get<any>(`${this.apiUrl}/weather/daily/${farmId}`, { headers })
    .subscribe(data => {
      this.dailyWeather = data.daily;
      this.todayWeather = this.dailyWeather[0]; // first day = today

      // Optional: generate AI insights
      this.aiInsights = this.generateInsightsFromWeather(this.todayWeather);
    }, error => console.log(error));
}

generateInsightsFromWeather(weather: DailyWeather): string[] {
  const insights: string[] = [];

  if (weather.pop > 0.5 || (weather.rain ?? 0) > 5) {
    insights.push("No need to water today, enough rain expected.");
  } else if (weather.temp.day > 25) {
    insights.push("High temperature: irrigate crops as needed.");
  } else {
    insights.push("Monitor soil moisture for best results.");
  }

  if (weather.uvi > 10) insights.push("UV is high: protect sensitive crops.");
  if (weather.humidity < 40) insights.push("Low humidity: crops may need extra watering.");

  return insights;
}


  // --- UI helpers --------------------------------------------------------
  populateStatList() {
    this.statList = [
      { label: 'Land Sections', value: this.stats?.totalLands ?? 0 },
      { label: 'Total Crops', value: this.stats?.totalCrops ?? 0 },
      { label: 'Pest Issues', value: this.stats?.pestCount ?? 0 },
      { label: 'Diseases', value: this.stats?.diseaseCount ?? 0 }
    ];
    this.statsReady = true;
  }

  updateHealthChart() {
    const good = this.stats?.healthyCrops ?? 0;
    const moderate = this.stats?.moderateCrops ?? 0;
    const critical = this.stats?.criticalCrops ?? 0;

    this.healthChartData = {
      labels: ['Good', 'Moderate', 'Critical'],
      datasets: [{
        data: [good, moderate, critical],
        backgroundColor: ['#4caf50', '#ffb300', '#f44336']
      }]
    };
  }

  generateInsights(weather: WeatherData): string[] {
    const insights: string[] = [];
    const humidity = parseInt((weather.humidity || '0').toString().replace('%',''), 10) || 0;
    const rainfall = parseInt((weather.rainfall || '0').toString().replace('mm',''), 10) || 0;

    if (weather.condition === 'Rainy' || rainfall > 5) {
      insights.push("No watering needed today — rainfall is expected.");
    } else if (weather.condition === 'Sunny' && rainfall === 0) {
      insights.push("Irrigation recommended — it's sunny and dry.");
    } else if (weather.condition === 'Cloudy' && humidity >= 60) {
      insights.push("Low water demand — monitor soil moisture.");
    } else {
      insights.push("Check soil moisture sensors before watering.");
    }
    insights.push("Run soil nutrient test if crops show stunted growth.");
    insights.push("Inspect vulnerable sections for pest outbreaks.");

    return insights;
  }

  // --- Actions -----------------------------------------------------------
  toggleMenu() { this.menuOpen = !this.menuOpen; }
  refreshAll() {
    this.getFarm(this.id);
    this.getFarmStats(this.id);
    this.getFarmLands(this.id);
    this.getRecentActivity(this.id);
    this.getFullForecast(this.id);
    Swal.fire({ toast:true, position:'top-end', title:'Refreshed', icon:'success', timer:900, showConfirmButton:false });
  }

  // Navigation helpers
  goToAddFarm() { this.router.navigate(['/farm-form']); }
  goToAddCrop() { this.router.navigate(['/crop-form', this.id]); }
  goToAddLand() { this.router.navigate(['/land-form', this.id]); }
  goToAddPest() { this.router.navigate(['/pest-disease', this.id]); }
  goToReports() { this.router.navigate(['/reports', this.id]); }
  goToSections() { this.router.navigate(['/land-list', this.id]); }
  goToCrops() { this.router.navigate(['/crop-list', this.id]); }
  goToActivity() { this.router.navigate(['/activity', this.id]); }

  viewLand(landId: number) { this.router.navigate(['/view-land', landId, this.id]); }
  goToAddCropForLand(landId:number){ this.router.navigate(['/crop-form', landId]); }
  navigateTo(path: string) { this.router.navigateByUrl(path); }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('/login');
  }
}

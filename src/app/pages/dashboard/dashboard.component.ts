import { Component } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
   farmName: string = 'Green Valley Farm';
  userProfilePic: string = '/assets/profile.jpg';
  menuOpen: boolean = false;

  weather = {
    temperature: '24°C',
    condition: 'Sunny',
    humidity: '55%',
    rainfall: '0mm'
  };

  aiInsights: string[] = [
    'Soil moisture is optimal for maize growth',
    'Fertilizer levels are sufficient for wheat',
    'Irrigation required for tomato section'
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToAddFarm() {
    // Navigate to add farm page
    console.log('Go to Add Farm');
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  farmName: string = 'Green Valley Farm';
  weather = {
    temperature: '24°C',
    condition: 'Sunny',
    humidity: '55%',
    rainfall: '0mm'
  };
  aiInsights: string[] = [
    'Soil moisture is optimal for maize growth 🌽',
    'Low risk of pests detected this week 🐛',
    'Consider irrigation in 3 days if no rain 🌧️'
  ];

  constructor() {}

  ngOnInit(): void {}

  goToAddFarm() {
    // Navigate to add farm page
  }

}

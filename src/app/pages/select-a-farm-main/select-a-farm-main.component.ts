import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../service/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-a-farm-main',
  templateUrl: './select-a-farm-main.component.html',
  styleUrl: './select-a-farm-main.component.scss'
})
export class SelectAFarmMainComponent implements OnInit{

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router)
  {
  }

  

  ngOnInit(): void {
    
   // this.getFarms();
  }

// getFarms() {
//   this.http.get<any>(this.apiUrl + "/farm/get-farm").subscribe({
//     next: (response) => {
//       console.log("Farms received:", response);
//       this.farms = response;
//     },
//     error: (err) => {
//       console.error("Error fetching farms:", err);
//       this.farms = []; // fallback so template renders
//     }
//   });
// }


userName = 'Phumudzo';

  // Example farms (can come from API later)
  farms = [
    { id: 1, name: 'Farm 1', image: '/istockphoto-543212762-612x612.jpg' },
    { id: 2, name: 'Farm 2', image: '/Crop676x507.jpg' },
    { id: 3, name: 'Farm 3', image: '/Crop676x507.jpg' },
    { id: 4, name: 'Farm 4', image: '/Crop676x507.jpg' },
    { id: 5, name: 'Farm 5', image: '/Crop676x507.jpg' }
  ];

  search = '';

  goToFarm(farmId: number) {
  console.log('Navigating to farm:', farmId);
  this.router.navigate(['/dashboard', farmId]);
}

  goToAddFarm() {
    console.log('Navigating to add farm');
    // Example: this.router.navigate(['/add-farm']);
  }

  onSearch() {
  console.log('Searching for:', this.search);
  // implement filtering logic here
}


}

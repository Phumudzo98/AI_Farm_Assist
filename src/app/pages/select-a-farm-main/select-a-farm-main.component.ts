import { Component } from '@angular/core';

@Component({
  selector: 'app-select-a-farm-main',
  templateUrl: './select-a-farm-main.component.html',
  styleUrl: './select-a-farm-main.component.scss'
})
export class SelectAFarmMainComponent {
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
    // Example: this.router.navigate(['/farm', farmId]);
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

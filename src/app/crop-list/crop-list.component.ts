import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrls: ['./crop-list.component.scss']
})
export class CropListComponent {
  crops = [
    { id: 1, name: 'Maize', type: 'Cereal', plantedDate: '2025-09-01' },
    { id: 2, name: 'Wheat', type: 'Cereal', plantedDate: '2025-07-15' },
    { id: 3, name: 'Tomatoes', type: 'Vegetable', plantedDate: '2025-08-20' }
  ];

  constructor(private router: Router) {}

  viewCrop(id: number) {
    this.router.navigate(['/view-crop', id]);
  }




goToAddCrop() {
  this.router.navigate(['/crop-form']); 
}


  editCrop(id: number) {
   
    this.router.navigate(['/crop-form', id]);
  }


}

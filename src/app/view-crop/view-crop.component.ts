import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-crop',
  templateUrl: './view-crop.component.html',
  styleUrls: ['./view-crop.component.scss']
})
export class ViewCropComponent implements OnInit {
  crop: any;

  crops = [
    { id: 1, name: 'Maize', type: 'Cereal', plantedDate: '2025-09-01', expectedHarvest: '2026-01-01', yield: 1200 },
    { id: 2, name: 'Wheat', type: 'Cereal', plantedDate: '2025-07-15', expectedHarvest: '2025-11-30', yield: 950 },
    { id: 3, name: 'Tomatoes', type: 'Vegetable', plantedDate: '2025-08-20', expectedHarvest: '2025-10-10', yield: 350 }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.crop = this.crops.find(c => c.id === id);
  }

  goBack() {
    this.router.navigate(['/crop-list']);
  }

 
  addPestDisease(cropId: number) {
    this.router.navigate(['/pest-disease', cropId]); 
  }


  viewPestDiseases(cropId: number) {
    this.router.navigate(['/pest-disease-list', cropId]); 
  }
}

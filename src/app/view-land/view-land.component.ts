import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-land',
  templateUrl: './view-land.component.html',
  styleUrls: ['./view-land.component.scss']
})
export class ViewLandComponent implements OnInit {
  land: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const landIdParam = this.route.snapshot.paramMap.get('id');
    const landId = landIdParam ? +landIdParam : null; 
    if (!landId) {
      console.error('Invalid or missing land ID!');
      this.router.navigate(['/land-list']);
      return;
    }

    console.log('Viewing land with ID:', landId);

    this.land = {
      id: landId,
      sectionName: 'Plot A',
      soilType: 'Loamy',
      irrigationType: 'Drip',
      underCultivation: true,
      lastPlantedDate: '2025-05-12',
      lastHarvestDate: '2025-09-01',
      latitude: '-29.8579',
      longitude: '31.0292',
      size: 5,
      metrics: 'hectares',
      notes: 'This land is suitable for maize and vegetables.'
    };
  }

  goBack(): void {
    this.router.navigate(['/land-list']);
  }

  viewSoilInfo(): void {
    if (!this.land?.id) return;
    this.router.navigate(['/soil-info', this.land.id]);
  }

  viewTaskActivity(): void {
    if (!this.land?.id) return;
    this.router.navigate(['/task-activity', this.land.id]);
  }
}

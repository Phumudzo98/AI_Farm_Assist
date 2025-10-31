import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-list',
  templateUrl: './land-list.component.html',
  styleUrls: ['./land-list.component.scss']
})
export class LandListComponent implements OnInit {
  lands: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
 
    this.lands = [
      {
        id: 1,
        sectionName: 'Plot A',
        soilType: 'Loamy',
        irrigationType: 'Drip',
        underCultivation: true,
        size: 5,
        metrics: 'hectares'
      },
      {
        id: 2,
        sectionName: 'Plot B',
        soilType: 'Sandy',
        irrigationType: 'Sprinkler',
        underCultivation: false,
        size: 3.5,
        metrics: 'hectares'
      }
    ];
  }

 viewLand(landId: number) {
  this.router.navigate(['/view-land', landId]);
}


  deleteLand(id: number): void {
    if (confirm('Are you sure you want to delete this land?')) {
      this.lands = this.lands.filter(l => l.id !== id);
    }
  }
}

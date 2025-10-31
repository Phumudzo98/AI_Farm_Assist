import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-soil-info',
  templateUrl: './soil-info.component.html',
  styleUrls: ['./soil-info.component.scss']
})
export class SoilInfoComponent implements OnInit {
  soil: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const landId = this.route.snapshot.paramMap.get('id');
    console.log('Viewing soil info for land ID:', landId);

 
    this.soil = {
      soilType: 'Loamy',
      phLevel: 6.5,
      moistureLevel: 35,
      nitrogen: 12,
      phosphorus: 8,
      potassium: 15,
      lastTestedDate: '2025-10-15'
    };
  }

  goBack(): void {
    this.router.navigate(['/view-land', this.route.snapshot.paramMap.get('id')]);
  }
}

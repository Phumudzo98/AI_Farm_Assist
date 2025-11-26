import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-soil-info',
  templateUrl: './soil-info.component.html',
  styleUrls: ['./soil-info.component.scss']
})
export class SoilInfoComponent implements OnInit {
  soil: any;

  showModal: boolean = false;
  isEditMode: boolean = false;
  soilFormData: any = {};

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
    const landId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/view-land', landId]);
  }

  // Open modal for adding new soil info
  addSoil(): void {
    this.isEditMode = false;
    this.soilFormData = {
      soilType: '',
      phLevel: null,
      moistureLevel: null,
      nitrogen: null,
      phosphorus: null,
      potassium: null,
      lastTestedDate: ''
    };
    this.showModal = true;
  }


  editSoil(): void {
    if (!this.soil) return;
    this.isEditMode = true;
    this.soilFormData = { ...this.soil };
    this.showModal = true;
  }

 
  deleteSoil(): void {
    if (confirm('Are you sure you want to delete this soil information?')) {
      this.soil = null;
    }
  }

  saveSoil(): void {
 
    if (!this.soilFormData.soilType) {
      alert('Soil Type is required');
      return;
    }

    this.soil = { ...this.soilFormData };
    this.showModal = false;
  }

 
  closeModal(): void {
    this.showModal = false;
  }
}

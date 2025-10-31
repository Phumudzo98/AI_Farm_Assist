import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-land-form',
  templateUrl: './land-form.component.html',
  styleUrls: ['./land-form.component.scss']
})
export class LandFormComponent implements OnInit {
  landForm!: FormGroup;
  landId!: number | null;
  isEditMode = false;
  loading = true;


  mockLands = [
    {
      id: 1,
      sectionName: 'Plot A',
      soilType: 'Loamy',
      lastPlantedDate: '2025-03-01',
      lastHarvestDate: '2025-07-01',
      irrigationType: 'Drip',
      underCultivation: true,
      latitude: '-25.7479',
      longitude: '28.2293',
      notes: 'Near water source',
      size: 2.5,
      metrics: 'hectares'
    },
    {
      id: 2,
      sectionName: 'Plot B',
      soilType: 'Sandy',
      lastPlantedDate: '2025-02-15',
      lastHarvestDate: '2025-06-20',
      irrigationType: 'Sprinkler',
      underCultivation: false,
      latitude: '-25.7480',
      longitude: '28.2300',
      notes: 'Needs fertilization',
      size: 1.8,
      metrics: 'hectares'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.landId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.landId;

    this.landForm = this.fb.group({
      sectionName: ['', Validators.required],
      soilType: [''],
      lastPlantedDate: [''],
      lastHarvestDate: [''],
      irrigationType: [''],
      underCultivation: [false],
      latitude: [''],
      longitude: [''],
      notes: [''],
      size: [''],
      metrics: ['']
    });

    if (this.isEditMode) {
      this.loadLandData();
    } else {
      this.loading = false;
    }
  }

  // Load data from mock array
  loadLandData(): void {
    const land = this.mockLands.find(l => l.id === this.landId);
    if (land) {
      this.landForm.patchValue(land);
    }
    this.loading = false;
  }

  onSubmit(): void {
    if (this.landForm.invalid) return;

    const landData = this.landForm.value;
    if (this.isEditMode) {
      console.log('Updating Land:', landData);
      alert('Land updated successfully!');
    } else {
      console.log('Adding Land:', landData);
      alert('Land added successfully!');
    }
    this.router.navigate(['/lands']);
  }
}

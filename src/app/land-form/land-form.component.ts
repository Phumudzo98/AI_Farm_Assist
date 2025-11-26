import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';
import Swal from 'sweetalert2';

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
  apiUrl:any=environment.apiUrl;


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
    private router: Router,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.landId = Number(this.route.snapshot.paramMap.get('id'));
    //this.isEditMode = !!this.landId;

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
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

    if (this.isEditMode) {
      // Update land
      this.http.put(`${this.apiUrl}/farm/update-land/${this.landId}`, landData, { headers }).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Updated!',
            text: 'Land updated successfully.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate(['/land-list', this.landId]);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update land.',
            icon: 'error'
          });
          console.error(err);
        }
      });
    } else {
     
      this.http.post(`${this.apiUrl}/farm/add-land/${this.landId}`, landData, { headers }).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Added!',
            text: 'Land added successfully.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate(['/land-list', this.landId]);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add land.',
            icon: 'error'
          });
          console.error(err);
        }
      });
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crop-form',
  templateUrl: './crop-form.component.html',
  styleUrls: ['./crop-form.component.scss']
})


export class CropFormComponent implements OnInit {
  cropForm!: FormGroup;
  lands: any[] = [];
  cropId!: number | null;
  landId!: number;
  isEditMode = false;
  loading = true;

  apiUrl:any = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    
    this.landId = Number(this.route.snapshot.paramMap.get("landId"));
    this.cropId = Number(this.route.snapshot.paramMap.get("cropId")); 

    
    this.isEditMode = !!this.cropId;

    
    this.cropForm = this.fb.group({
      cropName: ['', Validators.required],
      variety: [''],
      plantingDate: [''],
      expectedHarvestDate: [''],
      actualHarvestDate: [''],
      yield: [''],
      yieldUnit: [''],
      growthStage: [''],
      healthStatus: ['']
      
    });

    
    if (this.isEditMode) {
      this.loadCropData();
    } else {
      this.loading = false;
    }
  }

  loadCropData(): void {
    const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(`${this.apiUrl}/crop/crop-details/${this.cropId}`, { headers })
      .subscribe(
        data => {
          this.cropForm.patchValue(data);
          this.loading = false;
        },
        error => console.log(error)
      );
  }

  onSubmit(): void {
  if (this.cropForm.invalid) return;

  const token = localStorage.getItem('token');
  const payload = this.cropForm.value;

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  if (this.isEditMode) {

    this.http.put(
      `${this.apiUrl}/crop/update/${this.cropId}?landId=${this.landId}`,
      payload,
      { headers }
    ).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Crop Updated!',
          text: 'The crop has been updated successfully.',
          timer: 2000,
          showConfirmButton: false
        });

        this.router.navigate(['/crop-list', this.landId]);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Could not update crop. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );

  } else {

    this.http.post(
      `${this.apiUrl}/crop/add-crop/${this.landId}`,
      payload,
      { headers }
    ).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Crop Added!',
          text: 'A new crop has been added successfully.',
          timer: 2000,
          showConfirmButton: false
        });

        this.router.navigate(['/crop-list', this.landId]);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Creation Failed',
          text: 'Could not add crop. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}

}

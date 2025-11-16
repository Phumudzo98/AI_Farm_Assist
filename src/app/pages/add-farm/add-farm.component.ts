import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from '../../service/environments/environment';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrl: './add-farm.component.scss'
})

export class AddFarmComponent {
  farmForm!: FormGroup;
  selectedImage!: File;
  apiUrl = environment.apiUrl;
  currentStep: number = 1;

  uploadedFarm: any; // Store response for preview

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.farmForm = this.fb.group({
      farmName: ['', Validators.required],
      farm_type: ['', Validators.required],
      farm_location: ['', Validators.required],
      farm_description: [''],
      size: ['', Validators.required],
      metrics: ['', Validators.required],
      city: ['', Validators.required],
      landDetails: this.fb.array([this.createLandDetail()])
    });
  }

  get landDetails(): FormArray {
    return this.farmForm.get('landDetails') as FormArray;
  }

  createLandDetail(): FormGroup {
    return this.fb.group({
      sectionName: [''],
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
  }

  addLandDetail() {
    this.landDetails.push(this.createLandDetail());
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  nextStep() {
    if (this.currentStep === 1 && this.farmForm.valid) {
      this.currentStep = 2;
    } else {
      this.farmForm.markAllAsTouched();
    }
  }

  previousStep() {
    this.currentStep = 1;
  }

  onSubmit() {
    if (!this.farmForm.valid) {
      this.farmForm.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }; 

    const formData = new FormData();
    formData.append('farmName', this.farmForm.value.farmName);
    formData.append('farm_type', this.farmForm.value.farm_type);
    formData.append('farm_location', this.farmForm.value.farm_location);
    formData.append('farm_description', this.farmForm.value.farm_description);
    formData.append('size', this.farmForm.value.size);
    formData.append('metrics', this.farmForm.value.metrics);
    formData.append('city', this.farmForm.value.city);
    formData.append('landDetails', JSON.stringify(this.farmForm.value.landDetails));

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.http.post<any>(`${this.apiUrl}/farm/create-farm`, formData, { headers })
      .subscribe(
        (response) => {
          console.log('Farm created successfully', response);
          this.uploadedFarm = response;

          // ✅ SweetAlert2 success popup
          Swal.fire({
            icon: 'success',
            title: 'Farm Created!',
            text: 'Your farm has been created successfully.',
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false
          });
        },
        (error) => {
          console.error('Error creating farm', error);

          // ✅ SweetAlert2 error popup
          Swal.fire({
            icon: 'error',
            title: 'Creation Failed',
            text: 'Failed to create farm. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
  }

  getImageSrc(farm: any): string {
    if (!farm || !farm.image || !farm.fileType) return '';
   
    let base64String = '';
    if (typeof farm.image === 'string') {
      base64String = farm.image;
    } else {
      const bytes = farm.image;
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      base64String = btoa(binary);
    }
    return `data:${farm.fileType};base64,${base64String}`;
  }
}
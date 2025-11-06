import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from '../../service/environments/environment';
import { error } from 'console';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrl: './add-farm.component.scss'
})
export class AddFarmComponent {

farmForm!: FormGroup;
  selectedImage!: File;
  apiUrl:any=environment.apiUrl;
  currentStep: number = 1; // 1 = Farm Details, 2 = Land Details

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
      image: [null],
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
    if (this.farmForm.valid) {
      console.log(this.farmForm.value);
      // Send data to backend

      const token = localStorage.getItem('token'); 

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

      this.http.post<any>(this.apiUrl+"/farm/create-farm", this.farmForm.value,{headers}).subscribe((data)=>
      {
        console.log(data);
        
      }, error=>{
        console.log("Something went wrong");
        
      })
      
    } else {
      this.farmForm.markAllAsTouched();
    }
  }
}

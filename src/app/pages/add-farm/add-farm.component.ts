import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrl: './add-farm.component.scss'
})
export class AddFarmComponent {

farmForm!: FormGroup;
  selectedImage!: File;
  currentStep: number = 1; // 1 = Farm Details, 2 = Land Details

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.farmForm = this.fb.group({
      farm_name: ['', Validators.required],
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
    } else {
      this.farmForm.markAllAsTouched();
    }
  }
}

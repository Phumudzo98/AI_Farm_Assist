import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crop-form',
  templateUrl: './crop-form.component.html',
  styleUrls: ['./crop-form.component.scss']
})
export class CropFormComponent implements OnInit {
  cropForm!: FormGroup;
  lands: any[] = [];
  cropId!: number | null;
  isEditMode = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
   
  ) {}

  ngOnInit(): void {
    this.cropId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.cropId;

    // 🔹 Reactive Form setup
    this.cropForm = this.fb.group({
      cropName: ['', Validators.required],
      variety: [''],
      plantingDate: [''],
      expectedHarvestDate: [''],
      actualHarvestDate: [''],
      yield: [''],
      yieldUnit: [''],
      growthStage: [''],
      healthStatus: [''],
      landDetails: ['']
    });


    this.loadLands();
    if (this.isEditMode) this.loadCropData();
    else this.loading = false;
  }

 
  loadLands(): void {
    setTimeout(() => {
      this.lands = [
        { id: 1, landName: 'Plot A' },
        { id: 2, landName: 'Plot B' },
      ];
    }, 500);
  }

  loadCropData(): void {
    setTimeout(() => {
      const sampleCrop = {
        cropName: 'Maize',
        variety: 'Sweet Corn',
        plantingDate: '2025-05-01',
        expectedHarvestDate: '2025-09-01',
        actualHarvestDate: '',
        yield: 100,
        yieldUnit: 'kg',
        growthStage: 'Vegetative',
        healthStatus: 'Healthy',
        landDetails: 1
      };
      this.cropForm.patchValue(sampleCrop);
      this.loading = false;
    }, 800);
  }

  onSubmit(): void {
    if (this.cropForm.invalid) return;
    const cropData = this.cropForm.value;
    console.log(this.isEditMode ? 'Updating Crop:' : 'Creating Crop:', cropData);

    alert(`Crop ${this.isEditMode ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/crops']);
  }
}

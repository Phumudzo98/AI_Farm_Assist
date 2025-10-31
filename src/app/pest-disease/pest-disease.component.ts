import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pest-disease',
  templateUrl: './pest-disease.component.html',
  styleUrls: ['./pest-disease.component.scss']
})
export class PestDiseaseComponent implements OnInit {
  pestDiseaseForm!: FormGroup;
  cropId!: number;
  isEditMode = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cropId = Number(this.route.snapshot.paramMap.get('cropId'));
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    this.pestDiseaseForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      severity: ['', Validators.required],
      detectionDate: ['', Validators.required],
      actionTaken: [''],
      notes: ['']
    });

    if (this.isEditMode) this.loadRecord(id);
    else this.loading = false;
  }

  loadRecord(id: string | null) {
    // Replace with API call to fetch existing Pest/Disease
    setTimeout(() => {
      const sampleRecord = {
        type: 'Pest',
        name: 'Fall Armyworm',
        severity: 'High',
        detectionDate: '2025-10-01',
        actionTaken: 'Sprayed pesticide',
        notes: 'Observed severe damage in maize leaves'
      };
      this.pestDiseaseForm.patchValue(sampleRecord);
      this.loading = false;
    }, 500);
  }

  onSubmit(): void {
    if (this.pestDiseaseForm.invalid) return;

    const data = { ...this.pestDiseaseForm.value, cropId: this.cropId };
    console.log(this.isEditMode ? 'Updating record:' : 'Adding record:', data);

    alert(`Record ${this.isEditMode ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/pest-disease-list', this.cropId]);
  }
}

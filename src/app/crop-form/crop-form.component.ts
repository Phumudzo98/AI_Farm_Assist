import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';

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
      ).subscribe(() => {
        alert("Crop updated successfully!");
        this.router.navigate(['/crop-list', this.landId]);
      });

    } else {
      
      this.http.post(
        `${this.apiUrl}/crop/add-crop/${this.landId}`, 
        payload, 
        { headers }
      ).subscribe(() => {
        alert("Crop added successfully!");
        this.router.navigate(['/crop-list', this.landId]);
      });
    }
  }
}

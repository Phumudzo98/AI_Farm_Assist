import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';
import Swal from 'sweetalert2';

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
  apiUrl = environment.apiUrl;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  this.cropId = Number(this.route.snapshot.paramMap.get('cropId'));
  this.id = Number(this.route.snapshot.paramMap.get('id'));

  this.isEditMode = !!this.id;

  this.pestDiseaseForm = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    severity: ['', Validators.required],
    detectionDate: ['', Validators.required],
    actionTaken: [''],
    notes: ['']
  });

  if (this.isEditMode) {
    this.loadRecord();
  } else {
    this.loading = false;
  }
}

loadRecord(): void {

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };

  this.http.get<any>(`${this.apiUrl}/pest-disease/${this.id}`, { headers })
    .subscribe({
      next: (data) => {
        this.pestDiseaseForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Unable to load record.', 'error');
        this.loading = false;
      }
    });
}


  onSubmit(): void {
  if (this.pestDiseaseForm.invalid) return;

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };

  const data = this.pestDiseaseForm.value;

  const request = this.isEditMode
    ? this.http.put(`${this.apiUrl}/pest-disease/${this.id}`, data, { headers })
    : this.http.post(`${this.apiUrl}/pest-disease/${this.cropId}`, data, { headers });

  request.subscribe({
    next: () => {
      Swal.fire({
        title: this.isEditMode ? 'Updated!' : 'Added!',
        text: `Record successfully ${this.isEditMode ? 'updated' : 'created'}.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      this.router.navigate(['/pest-disease-list', this.cropId]);
    },
    error: (err) => {
      console.error(err);
      Swal.fire('Error', 'Failed to save record.', 'error');
    }
  });
}

}

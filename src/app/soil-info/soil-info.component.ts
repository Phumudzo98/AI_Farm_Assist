import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-soil-info',
  templateUrl: './soil-info.component.html',
  styleUrls: ['./soil-info.component.scss']




  
})export class SoilInfoComponent implements OnInit {

  soil: any;
  showModal: boolean = false;
  isEditMode: boolean = false;
  soilFormData: any = {};

  apiUrl = 'http://localhost:8080/api/soil';
  landId: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.landId = this.route.snapshot.paramMap.get('landId');

    console.log('Viewing soil info for land ID:', this.landId);

    
    this.loadSoil();
  }

  loadSoil() {

     const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any[]>(`${this.apiUrl}/by-land/${this.landId}`, { headers })
      .subscribe({
        next: (data) => {
          this.soil = data.length > 0 ? data[0] : null;
        },
        error: (err) => console.error("Failed loading soil:", err)
      });
  }

  goBack(): void {
    this.router.navigate(['/view-land', this.landId]);
  }

  addSoil(): void {
    this.isEditMode = false;
    this.soilFormData = {
      soilType: '',
      phLevel: null,
      moistureLevel: null,
      nitrogen: null,
      phosphorus: null,
      potassium: null,
      lastTestedDate: ''
    };
    this.showModal = true;
  }

  editSoil(): void {
    if (!this.soil) return;
    this.isEditMode = true;
    this.soilFormData = { ...this.soil };
    this.showModal = true;
  }

  deleteSoil(): void {
    if (!this.soil?.id) {
      alert("No soil record to delete.");
      return;
    }

     const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    if (confirm('Are you sure you want to delete this soil information?')) {
      this.http.delete(`${this.apiUrl}/${this.soil.id}`, { headers })
        .subscribe({
          next: () => {
            this.soil = null;
            alert("Soil deleted.");
          },
          error: (err) => console.error("Delete failed:", err)
        });
    }
  }

  saveSoil(): void {
    if (!this.soilFormData.soilType) {
      alert('Soil Type is required');
      return;
    }

    if (this.isEditMode) {
       const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
      
      this.http.put(`${this.apiUrl}/${this.soil.id}`, this.soilFormData, { headers })
        .subscribe({
          next: (updated) => {
            this.soil = updated;
            this.showModal = false;
            alert("Soil updated.");
          },
          error: (err) => console.error("Update failed:", err)
        });

    } else {

       const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
      
      this.http.post(`${this.apiUrl}/${this.landId}`, this.soilFormData, { headers })
        .subscribe({
          next: (created) => {
            this.soil = created;
            this.showModal = false;
            alert("Soil added.");
          },
          error: (err) => console.error("Create failed:", err)
        });
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}

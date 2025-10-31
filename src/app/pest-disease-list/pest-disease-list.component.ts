import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pest-disease-list',
  templateUrl: './pest-disease-list.component.html',
  styleUrls: ['./pest-disease-list.component.scss']
})
export class PestDiseaseListComponent implements OnInit {
  cropId!: number;
  records: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.cropId = Number(this.route.snapshot.paramMap.get('cropId'));
    this.loadRecords();
  }

  loadRecords(): void {

    setTimeout(() => {
      this.records = [
        { id: 1, type: 'Pest', name: 'Fall Armyworm', severity: 'High', detectionDate: '2025-10-01' },
        { id: 2, type: 'Disease', name: 'Late Blight', severity: 'Medium', detectionDate: '2025-09-15' },
      ];
    }, 500);
  }

  editRecord(id: number) {
    this.router.navigate(['/pest-disease', this.cropId]);
  }

  deleteRecord(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.records = this.records.filter(r => r.id !== id);
    }
  }

  addNew() {
    this.router.navigate(['/pest-disease']);
  }
}

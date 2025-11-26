import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';
import { log } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pest-disease-list',
  templateUrl: './pest-disease-list.component.html',
  styleUrls: ['./pest-disease-list.component.scss']
})
export class PestDiseaseListComponent implements OnInit {
  cropId!: number;
  records: any[] = [];
  apiUrl:any=environment.apiUrl;

  crops:any;
  id:any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.cropId = Number(this.route.snapshot.paramMap.get('cropId'));
    this.id=Number(this.route.snapshot.paramMap.get('id'));

    const token = localStorage.getItem('token'); 
    

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.apiUrl+"/pest-disease/by-crop/"+this.cropId,{headers}).subscribe((data)=>
    {
      console.log(data);
      this.crops=data;
      
    }, error=>
    {
      console.log(error);
      
    })
    
    //this.loadRecords();
  }

  loadRecords(): void {

    setTimeout(() => {
      this.records = [
        { id: 1, type: 'Pest', name: 'Fall Armyworm', severity: 'High', detectionDate: '2025-10-01' },
        { id: 2, type: 'Disease', name: 'Late Blight', severity: 'Medium', detectionDate: '2025-09-15' },
      ];
    }, 500);
  }

 editRecord(recordId: number) {
  this.router.navigate(['/pest-disease', this.cropId, 'edit', recordId]);
}


  deleteRecord(id: number): void {

    const token = localStorage.getItem('token'); 
    

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    Swal.fire({
      title: 'Are you sure?',
      text: 'This record will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(result => {

      if (result.isConfirmed) {

        
        this.http.delete(`${this.apiUrl}/pest-disease/${id}`, {headers}).subscribe({
          next: () => {
           
            this.records = this.records.filter(r => r.id !== id);

            Swal.fire({
              title: 'Deleted!',
              text: 'Record has been deleted.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          },

          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the record.',
              icon: 'error'
            });
            console.error('DELETE error:', err);
          }
        });

      }

    });
  }

  addNew() {
    this.router.navigate(['/pest-disease', this.cropId]);
  }
}

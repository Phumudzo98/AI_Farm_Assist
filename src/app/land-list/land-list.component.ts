import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';
import { log } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-land-list',
  templateUrl: './land-list.component.html',
  styleUrls: ['./land-list.component.scss']
})
export class LandListComponent implements OnInit {
  lands: any[] = [];
  apiUrl:any=environment.apiUrl;
  farmId:any;

  land:any;
  
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {


    const token = localStorage.getItem('token'); 
    this.farmId = this.route.snapshot.paramMap.get('id');

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.apiUrl+"/farm/get-farm-landList/"+this.farmId, {headers}).subscribe((data)=>
    {
      console.log(data);
      this.land=data;
      
    }, error=>
    {
      console.log(error);
      
    })

  }

 viewLand(landId: number) {
  this.router.navigate(['/view-land', landId, this.farmId]);
}


  deleteLand(id: number): void {


    const token = localStorage.getItem('token'); 
    

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };


    Swal.fire({
      title: 'Are you sure?',
      text: 'This land will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete(`${this.apiUrl}/farm/delete-land/${id}`, {headers}).subscribe({
          next: () => {
            
            this.lands = this.lands.filter(l => l.id !== id);

            Swal.fire({
              title: 'Deleted!',
              text: 'The land has been deleted.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete the land.',
              icon: 'error'
            });
            console.error('Delete error:', err);
          }
        });

      }
    });
  }
}

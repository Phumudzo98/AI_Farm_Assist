import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrls: ['./crop-list.component.scss']
})
export class CropListComponent implements OnInit{
  landId:any;
  cropList:any;
  apiUrl:any=environment.apiUrl;
  crops:any;
  // crops = [
  //   { id: 1, name: 'Maize', type: 'Cereal', plantedDate: '2025-09-01' },
  //   { id: 2, name: 'Wheat', type: 'Cereal', plantedDate: '2025-07-15' },
  //   { id: 3, name: 'Tomatoes', type: 'Vegetable', plantedDate: '2025-08-20' }
  // ];

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit(): void {

    this.landId = this.route.snapshot.paramMap.get('id');

    const token = localStorage.getItem('token'); 
    

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.apiUrl+"/crop/crop-by-land/"+this.landId, {headers}).subscribe((data)=>
    {
      console.log(data);
      this.crops=data
      
    }, error=>
    {
      console.log(error);
      
    })
    throw new Error('Method not implemented.');
  }



  viewCrop(cropId: number) {
  this.router.navigate(['/view-crop', this.landId, cropId]);
}



goToAddCrop() {
  this.router.navigate(['/crop-form', this.landId]);
}



 editCrop(id: number) {
  this.router.navigate(['/crop-form', this.landId, 'edit', id]);
}




}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';

@Component({
  selector: 'app-view-crop',
  templateUrl: './view-crop.component.html',
  styleUrls: ['./view-crop.component.scss']
})
export class ViewCropComponent implements OnInit {
  crop: any;
  landId:any;
  cropId:any;
  apiUrl:any=environment.apiUrl;

  crops = [
    { id: 1, name: 'Maize', type: 'Cereal', plantedDate: '2025-09-01', expectedHarvest: '2026-01-01', yield: 1200 },
    { id: 2, name: 'Wheat', type: 'Cereal', plantedDate: '2025-07-15', expectedHarvest: '2025-11-30', yield: 950 },
    { id: 3, name: 'Tomatoes', type: 'Vegetable', plantedDate: '2025-08-20', expectedHarvest: '2025-10-10', yield: 350 }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private http:HttpClient) {}

  ngOnInit() {
    const landId = Number(this.route.snapshot.paramMap.get('landId'));
    const cropId = Number(this.route.snapshot.paramMap.get('cropId'));

    this.landId=landId;
    this.cropId=cropId;

    this.getCropDetails();

    //this.crop = this.crops.find(c => c.id === id);
  }

  goBack() {
    this.router.navigate(['/crop-list', this.landId]);
  }

 
  addPestDisease(cropId: number) {
    this.router.navigate(['/pest-disease', cropId]); 
  }


  viewPestDiseases(cropId: number) {
    this.router.navigate(['/pest-disease-list', cropId]); 
  }

  getCropDetails()
  {
     const token = localStorage.getItem('token'); 

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.apiUrl+"/crop/crop-details/"+this.cropId, {headers}).subscribe((data)=>
    {
        console.log(data);
        this.crop=data;
        
    },error=>
    {
        console.log(error);
        
    })

  }
}

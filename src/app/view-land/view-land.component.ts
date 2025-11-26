import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';
import { log } from 'console';

@Component({
  selector: 'app-view-land',
  templateUrl: './view-land.component.html',
  styleUrls: ['./view-land.component.scss']
})
export class ViewLandComponent implements OnInit {
  land: any;
  apiUrl:any=environment.apiUrl;
  landId:any;
  farmId:any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token'); 

    
    

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };


    const landIdParam = this.route.snapshot.paramMap.get('id');
    this.farmId=this.route.snapshot.paramMap.get('farmId');
    
    const landId = landIdParam ? +landIdParam : null; 
    this.landId=landId
    if (!landId) {
      console.error('Invalid or missing land ID!');
      this.router.navigate(['/land-list']);
      return;
    }

    this.http.get<any>(this.apiUrl+"/farm/get-land-details/"+landId, {headers}).subscribe((data)=>
    {
      console.log(data);
      this.land=data
      
    }, error=>{
      console.log(error);
      
    })

    console.log('Viewing land with ID:', landId);

    // this.land = {
    //   id: landId,
    //   sectionName: 'Plot A',
    //   soilType: 'Loamy',
    //   irrigationType: 'Drip',
    //   underCultivation: true,
    //   lastPlantedDate: '2025-05-12',
    //   lastHarvestDate: '2025-09-01',
    //   latitude: '-29.8579',
    //   longitude: '31.0292',
    //   size: 5,
    //   metrics: 'hectares',
    //   notes: 'This land is suitable for maize and vegetables.'
    // };
  }

  goBack(): void {
    this.router.navigate(['/land-list', this.farmId]);
  }

  viewSoilInfo(): void {
    if (!this.land?.id) return;
    this.router.navigate(['/soil-info', this.land.id]);
  }

  viewTaskActivity(): void {
   
    this.router.navigate(['/task-activity', this.landId]);
  }

  viewCrop():void
  {
    this.router.navigate(['/crop-list',  this.landId]);
  }
}

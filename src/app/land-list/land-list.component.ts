import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';
import { log } from 'console';

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

 
    this.lands = [
      {
        id: 1,
        sectionName: 'Plot A',
        soilType: 'Loamy',
        irrigationType: 'Drip',
        underCultivation: true,
        size: 5,
        metrics: 'hectares'
      },
      {
        id: 2,
        sectionName: 'Plot B',
        soilType: 'Sandy',
        irrigationType: 'Sprinkler',
        underCultivation: false,
        size: 3.5,
        metrics: 'hectares'
      }
    ];
  }

 viewLand(landId: number) {
  this.router.navigate(['/view-land', landId]);
}


  deleteLand(id: number): void {
    if (confirm('Are you sure you want to delete this land?')) {
      this.lands = this.lands.filter(l => l.id !== id);
    }
  }
}

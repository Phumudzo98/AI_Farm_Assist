import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../service/environments/environment';
import { Router } from '@angular/router';
import { log } from 'node:console';

@Component({
  selector: 'app-select-a-farm-main',
  templateUrl: './select-a-farm-main.component.html',
  styleUrl: './select-a-farm-main.component.scss'
})
export class SelectAFarmMainComponent implements OnInit{

  apiUrl = environment.apiUrl;
  farms:any= [];

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    
    this.getFarms();
  }

 

  getFarms() {

  const token = localStorage.getItem('token'); 

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  this.http.get<any>(this.apiUrl + "/farm/get-farms", {headers}).subscribe({
    next: (response) => {
      console.log("Farms received:", response);
      this.farms = response;
      console.log(this.farms);
      
    },
    error: (err) => {
      console.error("Error fetching farms:", err);
     
    }
  });
}


  userName = 'Phumudzo';

  search = '';

  goToFarm(farmId: number) {
  console.log('Navigating to farm:', farmId);
  this.router.navigate(['/dashboard', farmId]);
}

  goToAddFarm() {
    console.log('Navigating to add farm');

    this.router.navigate(['/add-farm'])
   
  }

  onSearch() {
  console.log('Searching for:', this.search);
  
  }


}

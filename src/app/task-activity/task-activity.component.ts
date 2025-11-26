import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../service/environments/environment';
import { log } from 'console';

@Component({
  selector: 'app-task-activity',
  templateUrl: './task-activity.component.html',
  styleUrls: ['./task-activity.component.scss']
})
export class TaskActivityComponent implements OnInit {
  landId!: string | null;
  tasks: any[] = [];
  apiUrl:any=environment.apiUrl;

  constructor(private route: ActivatedRoute, private router: Router, private http:HttpClient) { }

  ngOnInit(): void {
 
    this.landId = this.route.snapshot.paramMap.get('id');

    console.log('Viewing tasks for land ID:', this.landId);

    const token = localStorage.getItem('token'); 
    

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.apiUrl+"/task-activity/by-land/"+this.landId, {headers}).subscribe((data)=>
    {
      console.log(data);
      this.tasks=data
      
    }, error=>
    {
      console.log(error);
      
    })
  
    
  }

  goBack(): void {
    this.router.navigate(['/view-land', this.landId]);
  }
}

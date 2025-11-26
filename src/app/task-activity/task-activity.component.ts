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
      
    }, error=>
    {
      console.log(error);
      
    })
  
    this.tasks = [
      { taskName: 'Irrigation', description: 'Water crops in Plot A', taskDate: '2025-09-10', status: 'Completed', assignedTo: 'Worker 1' },
      { taskName: 'Fertilizer Application', description: 'Apply NPK fertilizer', taskDate: '2025-09-12', status: 'Pending', assignedTo: 'Worker 2' },
      { taskName: 'Weeding', description: 'Remove weeds', taskDate: '2025-09-15', status: 'In Progress', assignedTo: 'Worker 3' }
    ];
  }

  goBack(): void {
    this.router.navigate(['/view-land', this.landId]);
  }
}

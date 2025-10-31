import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-activity',
  templateUrl: './task-activity.component.html',
  styleUrls: ['./task-activity.component.scss']
})
export class TaskActivityComponent implements OnInit {
  landId!: string | null;
  tasks: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
 
    this.landId = this.route.snapshot.paramMap.get('id');
    console.log('Viewing tasks for land ID:', this.landId);

  
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

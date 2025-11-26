import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {

  taskForm!: FormGroup;
  isEdit: boolean = false;
  landId: any;
  apiUrl = 'http://localhost:8080/api/task-activity';

  taskId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    const nav = this.router.getCurrentNavigation();
    const task = nav?.extras?.state?.['task'];

    this.isEdit = !!task;
    this.taskId = task?.id;

    this.taskForm = this.fb.group({
      taskName: [task?.taskName || '', Validators.required],
      description: [task?.description || '', Validators.required],
      taskDate: [task?.taskDate || '', Validators.required],
      status: [task?.status || 'Pending', Validators.required],
      assignedTo: [task?.assignedTo || '', Validators.required]
    });
  }

  ngOnInit(): void {
   this.landId = this.route.snapshot.paramMap.get('landId');
  this.taskId = this.route.snapshot.paramMap.get('id');
  }

  saveTask() {
    if (this.taskForm.invalid) return;

     const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    const taskData = this.taskForm.value;

    if (this.isEdit) {
    
      this.http.put(`${this.apiUrl}/${this.taskId}`, taskData, { headers })
        .subscribe({
          next: () => {
            console.log("Task updated!");
            this.router.navigate(['/task-activity', this.landId]);
          },
          error: (err) => console.error("Update error:", err)
        });

    } else {
     
      this.http.post(`${this.apiUrl}/create-task/${this.landId}`, taskData, { headers })
        .subscribe({
          next: () => {
            console.log("Task created!");
            this.router.navigate(['/task-activity', this.landId]);
          },
          error: (err) => console.error("Create error:", err)
        });
    }
  }

  goBack() {
    this.router.navigate(['/task-activity', this.landId]);
  }
}

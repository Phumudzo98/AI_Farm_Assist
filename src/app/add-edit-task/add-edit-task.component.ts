import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


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
  if (this.taskForm.invalid) {
    Swal.fire('Validation', 'Please fill in all required fields', 'warning');
    return;
  }

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
  const taskData = this.taskForm.value;

  if (this.isEdit) {
    this.http.put(`${this.apiUrl}/${this.taskId}`, taskData, { headers })
      .subscribe({
        next: () => {
          Swal.fire('Updated!', 'Task has been updated successfully.', 'success')
            .then(() => {
              this.router.navigate(['/task-activity', this.landId]);
            });
        },
        error: (err) => {
          console.error("Update error:", err);
          Swal.fire('Error!', 'Failed to update task.', 'error');
        }
      });
  } else {
    this.http.post(`${this.apiUrl}/create-task/${this.landId}`, taskData, { headers })
      .subscribe({
        next: () => {
          Swal.fire('Created!', 'Task has been created successfully.', 'success')
            .then(() => {
              this.router.navigate(['/task-activity', this.landId]);
            });
        },
        error: (err) => {
          console.error("Create error:", err);
          Swal.fire('Error!', 'Failed to create task.', 'error');
        }
      });
  }
}

  goBack() {
    this.router.navigate(['/task-activity', this.landId]);
  }
}

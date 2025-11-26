import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {

  taskForm!: FormGroup;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const task = nav?.extras?.state?.['task'];

    this.isEdit = !!task;

    this.taskForm = this.fb.group({
      taskName: [task?.taskName || '', Validators.required],
      description: [task?.description || '', Validators.required],
      taskDate: [task?.taskDate || '', Validators.required],
      status: [task?.status || 'Pending', Validators.required],
      assignedTo: [task?.assignedTo || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  saveTask() {
    if (this.taskForm.invalid) return;

    const taskData = this.taskForm.value;

    if (this.isEdit) {
      console.log('Updated Task:', taskData);
   
    } else {
      console.log('New Task Added:', taskData);
  
    }

    this.router.navigate(['/task-activity']);
  }

  goBack() {
    this.router.navigate(['/task-activity']);
  }
}

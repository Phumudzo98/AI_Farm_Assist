import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../service/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

 
  apiUrl = environment.apiUrl

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
    });
  }


onRegister() {
  if (this.registerForm.valid) {
    const formData = {
      username: this.registerForm.value.email,
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      phoneNumber: this.registerForm.value.phoneNumber,
      postalCode: this.registerForm.value.postalCode,
      city: this.registerForm.value.city,
      province: this.registerForm.value.province
    };

    this.http.post(this.apiUrl + "/auth/register", formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Your account has been created successfully.',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        });

        this.router.navigate(['/login']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err?.error?.message || 'Something went wrong. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    });
  } else {
    this.registerForm.markAllAsTouched();

    
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Form',
      text: 'Please fill in all required fields correctly.',
      confirmButtonText: 'OK'
    });
  }
}

}
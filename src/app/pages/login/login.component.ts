import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../service/login.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false; 
  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


onLogin() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();

  
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Form',
      text: 'Please enter both email and password.',
      confirmButtonText: 'OK'
    });
    return;
  }

  this.isLoading = true;

  const { email, password } = this.loginForm.value;

  this.loginService.login(email, password).subscribe({
    next: () => {
      this.isLoading = false;

    Swal.fire({
  icon: 'success',
  title: 'Login Successful!',
  text: 'Welcome back!',
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
  willClose: () => {
    // optional: do something just before it closes
  }
}).then(() => {
  // Navigate after the alert is fully closed
  this.router.navigate(['/select-a-farm']);
});

    },
    error: (err) => {
      this.isLoading = false;
      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password',
        confirmButtonText: 'OK'
      });
    }
  });
}

  
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}

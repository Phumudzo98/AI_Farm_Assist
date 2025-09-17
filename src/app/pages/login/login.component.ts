import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../service/login.service.service';

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
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']); // redirect on successful login
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  // Optional helper methods for form validation in template
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}

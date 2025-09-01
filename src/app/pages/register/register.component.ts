import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
      console.log('Form Data:', this.registerForm.value);
      // Call your backend API to register the user
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}

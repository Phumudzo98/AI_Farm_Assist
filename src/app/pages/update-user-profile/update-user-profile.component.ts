import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrl: './update-user-profile.component.scss'
})
export class UpdateUserProfileComponent {
 profileForm!: FormGroup;
  userProfilePic: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize form with dummy values (replace with real user data from backend)
    this.profileForm = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['john@example.com', [Validators.required, Validators.email]],
      phoneNumber: ['+1234567890'],
      city: ['Toronto'],
      province: ['Ontario'],
      postalCode: ['M1A1A1']
    });

    // Default profile picture
    this.userProfilePic = 'assets/default-avatar.png';
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userProfilePic = reader.result; // preview selected image
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      console.log('Form Data:', this.profileForm.value);
      console.log('Profile Picture:', this.userProfilePic);
      // TODO: Send form + image to backend API
    }
  }


}

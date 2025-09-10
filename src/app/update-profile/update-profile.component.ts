import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
 profileForm!: FormGroup;
  user: any = {
    firstName: 'Thandolwethu',
    lastName: 'Mthethwa',
    email: 'thando77@email.com',
    avatar: 'assets/default-avatar.png',
    phoneNumber: '078656567',
    postalCode: '3500',
    city: 'Nkandla',
    province: 'Kwazulu Natal'
  };

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      postalCode: [this.user.postalCode, Validators.required],
      city: [this.user.city, Validators.required],
      province: [this.user.province, Validators.required],
    });
  }

  triggerUploadPhoto() {
    this.fileInput.nativeElement.click();
  }

  uploadPhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.avatar = reader.result as string; // Preview image
        // TODO: Upload to backend API
        console.log('Photo uploaded:', file.name);
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdateProfile() {
    if (this.profileForm.valid) {
      console.log('Updated Profile:', this.profileForm.value);
      // TODO: call backend API to save changes
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}




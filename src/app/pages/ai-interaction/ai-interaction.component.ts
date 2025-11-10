import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { environment } from '../../service/environments/environment';

interface Message {
  sender: 'user' | 'ai';
  text?: string;
  image?: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-ai-interaction',
  templateUrl: './ai-interaction.component.html',
  styleUrl: './ai-interaction.component.scss'
})export class AiInteractionComponent implements OnInit {

  userText: string = '';
  uploadedImage: File | null = null;
  aiResponse: string = '';
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

 
  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file;
    }
  }

  
  sendToAI(): void {
    if (!this.userText || !this.uploadedImage) {
      this.aiResponse = 'Please provide a text prompt and upload an image.';
      return;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });

    const formData = new FormData();
    formData.append('prompt', this.userText);
    formData.append('file', this.uploadedImage);

    this.http.post(`${this.apiUrl}/farm/analyze`, formData, {
      headers,
      responseType: 'text' 
    })
    .subscribe({
      next: (response) => {
        console.log('AI Response:', response);
        this.aiResponse = response;
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.aiResponse = 'Error analyzing image.';
      }
    });
  }
}
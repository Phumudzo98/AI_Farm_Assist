import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../service/environments/environment.prod';



interface ChatMessage {
  userMessage: string;
  userImage?: string | ArrayBuffer | null;
  aiResponse: string;
}

@Component({
  selector: 'app-ask-ai',
  templateUrl: './ask-ai.component.html',
  styleUrls: ['./ask-ai.component.scss']
})


export class AskAiComponent {
  message: string = '';
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  loading: boolean = false;
  conversation: ChatMessage[] = [];  // stores all messages
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  sendMessage() {
    if (!this.message && !this.selectedFile) {
      alert('Please enter a message or upload an image.');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('prompt', this.message);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    } else {
      const emptyFile = new Blob([], { type: 'application/octet-stream' });
      formData.append('file', emptyFile, 'empty.jpg');
    }

    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.post(`${this.apiUrl}/farm/analyze`, formData, { 
      headers,
      responseType: 'text' 
    }).subscribe({
      next: (response) => {
        // Add the current conversation to the list
        this.conversation.push({
          userMessage: this.message,
          userImage: this.previewUrl,
          aiResponse: response
        });

        this.loading = false;

        // Clear message and selected file for the next question
        this.message = '';
        this.selectedFile = null;
        this.previewUrl = null;
      },
      error: (err) => {
        console.error('Error analyzing image:', err);
        this.conversation.push({
          userMessage: this.message,
          userImage: this.previewUrl,
          aiResponse: 'Error: Could not analyze the image.'
        });
        this.loading = false;
        this.message = '';
        this.selectedFile = null;
        this.previewUrl = null;
      }
    });
  }
}


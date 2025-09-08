import { Component } from '@angular/core';

@Component({
  selector: 'app-ask-ai',
  templateUrl: './ask-ai.component.html',
  styleUrls: ['./ask-ai.component.scss']
})
export class AskAiComponent {
  message: string = '';
  selectedFile: File | null = null;
   previewUrl: string | ArrayBuffer | null = null;
   aiResponse: string = '';


 onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result; 
      };

      reader.readAsDataURL(file);
    }
  }

sendMessage() {
  if (!this.message && !this.selectedFile) {
    alert('Please enter a message or upload an image.');
    return;
  }

  console.log('Message:', this.message);
  if (this.selectedFile) {
    console.log('Image:', this.selectedFile.name);
  }


  this.aiResponse = `AI says: I received your message "${this.message}"`; 
  
    this.message = '';
      this.previewUrl = '';
    this.selectedFile = null;
  }
}

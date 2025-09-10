import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

interface Message {
  sender: 'user' | 'ai';
  text?: string;
  image?: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-ai-interaction',
  templateUrl: './ai-interaction.component.html',
  styleUrl: './ai-interaction.component.scss'
})
export class AiInteractionComponent {
  userText: string = '';
  uploadedImage: string | ArrayBuffer | null = null;
  aiResponse: string = '';

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  sendToAI(): void {
    // simulate a backend AI response
    if (!this.userText && !this.uploadedImage) {
      this.aiResponse = 'Please provide text or upload an image.';
      return;
    }

    // Dummy AI responses
    const dummyResponses = [
      'This looks like a healthy plant 🌱',
      'The object in the image seems to be a car 🚗',
      'Based on your text, I think you are asking about agriculture.',
      'The AI believes the image might show food 🍎',
      'Interesting input! The AI will need more details.'
    ];

    this.aiResponse =
      dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
  }

}

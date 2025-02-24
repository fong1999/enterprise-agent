import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chatbot-container',
  templateUrl: './chatbot-container.component.html',
  styleUrl: './chatbot-container.component.scss',
  imports: [CommonModule]
})
export class ChatbotContainerComponent {
  @Input() selectedAgent: string = '';
}

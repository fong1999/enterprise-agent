// src/app/components/chatbot-container/chatbot-container.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatbot-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-container.component.html',
  styleUrls: ['./chatbot-container.component.scss']
})
export class ChatbotContainerComponent implements OnInit, OnDestroy, AfterViewChecked {
  private chatbotService = inject(ChatbotService);
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  currentMessage = '';
  messages: ChatMessage[] = [];
  connectionStatus = 'Disconnected';
  isLoading = false; // Added the missing property
  selectedAgent: string = 'Copilot';
  
  private subscriptions: Subscription[] = [];
  private shouldScrollToBottom = false;
  
  ngOnInit() {
    // Subscribe to messages
    this.subscriptions.push(
      this.chatbotService.messages$.subscribe(messages => {
        this.messages = messages;
        this.shouldScrollToBottom = true;
        this.isLoading = false; // Set loading to false when messages are received
      })
    );
    
    // Subscribe to connection status
    this.subscriptions.push(
      this.chatbotService.connectionStatus$.subscribe(status => {
        this.connectionStatus = status;
      })
    );
    
    // Connect to bot
    this.chatbotService.connectToBot();
  }
  
  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }
  
  ngOnDestroy() {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.chatbotService.disconnect();
  }
  
  sendMessage() {
    if (this.currentMessage.trim() && !this.isLoading) {
      this.isLoading = true; // Set loading to true when sending a message
      this.chatbotService.sendMessage(this.currentMessage);
      this.currentMessage = '';
    }
  }
  
  sendSuggestedAction(text: string) {
    if (!this.isLoading) {
      this.isLoading = true; // Set loading to true when sending a suggested action
      this.chatbotService.sendMessage(text);
    }
  }
  
  clearChat() {
    this.chatbotService.clearMessages();
  }
  
  private scrollToBottom() {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
  
  // Handle keydown events
  onKeyDown(event: KeyboardEvent) {
    // Send message on Enter without Shift key
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
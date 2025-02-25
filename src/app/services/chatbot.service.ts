// src/app/services/chatbot.service.ts
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DirectLine, Activity } from 'botframework-directlinejs';
import { BehaviorSubject } from 'rxjs';

// Define the message format used in the UI
export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  from: {
    id: string;
    name: string;
  };
  attachments?: any[];
  suggestedActions?: any;
  type: 'user' | 'bot';
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private authService = inject(AuthService);
  private directLine: DirectLine | null = null;
  private botId = 'your-bot-id'; // Replace with your actual bot ID
  private directLineSecret = 'your-directline-secret'; // Or use token endpoint
  
  // Observable sources
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private connectionStatusSubject = new BehaviorSubject<string>('Disconnected');
  
  // Observable streams
  public messages$ = this.messagesSubject.asObservable();
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  constructor() {}

  async connectToBot() {
    try {
      this.connectionStatusSubject.next('Connecting...');
      
      // Get user info from auth service
      const isAuthenticated = await this.authService.isAuthenticated();
      
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }
      
      // Initialize DirectLine
      this.directLine = new DirectLine({
        secret: this.directLineSecret,
        webSocket: true
      });
      
      // Listen for messages
      this.directLine.activity$.subscribe(
        (activity: Activity) => {
          if (activity.type === 'message') {
            const messages = this.messagesSubject.value;
            
            // Create a properly shaped message object from the activity
            const newMessage: ChatMessage = {
              id: activity.id || Date.now().toString(),
              text: activity.text || '',
              timestamp: new Date(activity.timestamp || Date.now()),
              from: {
                id: activity.from?.id || (activity.from?.role === 'bot' ? this.botId : 'user'),
                name: activity.from?.name || (activity.from?.role === 'bot' ? 'Bot' : 'User')
              },
              type: activity.from?.role === 'bot' || activity.from?.id === this.botId ? 'bot' : 'user',
              suggestedActions: activity.suggestedActions,
              attachments: activity.attachments
            };
            
            this.messagesSubject.next([...messages, newMessage]);
          }
        },
        (error) => {
          console.error('DirectLine error:', error);
          this.connectionStatusSubject.next('Error: ' + error.message);
        }
      );
      
      this.connectionStatusSubject.next('Connected');
      
      // Send user identity in a special event activity
      await this.sendUserIdentity();
      
    } catch (error) {
      console.error('Failed to connect to bot:', error);
      this.connectionStatusSubject.next('Connection failed');
    }
  }
  
  async sendUserIdentity() {
    if (!this.directLine) return;
    
    try {
      // Get user info from MSAL
      const isAuthenticated = await this.authService.isAuthenticated();
      if (!isAuthenticated) return;
      
      // This is a placeholder - you'll need to add a method to your AuthService
      // that returns the user's information
      const userInfo = { 
        username: 'user@example.com',  // Replace with actual user email
        name: 'User Name'              // Replace with actual user name
      };
      
      // Send user identity as an event
      this.directLine.postActivity({
        type: 'event',
        name: 'userInfo',
        from: { id: userInfo.username || 'user', name: userInfo.name || 'User' },
        value: {
          email: userInfo.username,
          name: userInfo.name
        }
      }).subscribe();
    } catch (error) {
      console.error('Error sending user identity:', error);
    }
  }
  
  sendMessage(text: string) {
    if (!this.directLine || !text.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      timestamp: new Date(),
      from: { id: 'user', name: 'User' },
      type: 'user'
    };
    
    // Add user message to UI immediately
    const messages = this.messagesSubject.value;
    this.messagesSubject.next([...messages, userMessage]);
    
    // Send to bot
    this.directLine.postActivity({
      type: 'message',
      text: text,
      from: { id: 'user', name: 'User' }
    }).subscribe(
      (id) => console.log('Message sent, id: ', id),
      (error) => console.error('Error sending message: ', error)
    );
  }
  
  clearMessages() {
    this.messagesSubject.next([]);
  }
  
  disconnect() {
    if (this.directLine) {
      // DirectLine doesn't have an explicit disconnect method,
      // but we can clean up our state
      this.directLine = null;
      this.messagesSubject.next([]);
      this.connectionStatusSubject.next('Disconnected');
    }
  }
}
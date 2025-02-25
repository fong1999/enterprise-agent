import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { ChatbotContainerComponent } from './components/chatbot-container/chatbot-container.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './auth/auth.service';
import { ContentFeedComponent } from './components/content-feed/content-feed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HeaderComponent, ChatbotContainerComponent, LeftPanelComponent, RightPanelComponent, FooterComponent, ContentFeedComponent]
})
export class AppComponent implements OnInit {
  selectedAgent: string = '';

  selectAgent(agent: string) {
    this.selectedAgent = agent;
  }
  
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      // Ensure MSAL is initialized before checking authentication
      await this.authService.initialize();
      
      // Now it's safe to check authentication status
      const isAuthenticated = await this.authService.isAuthenticated();
      
      if (!isAuthenticated) {
        // Use await to ensure this completes properly
        await this.authService.login();
      }
      
      console.log('✅ Authentication setup complete');
    } catch (error) {
      console.error('❌ Authentication initialization failed:', error);
      // You might want to show a user-friendly error message here
      // or retry the initialization after a delay
    }
  }
}
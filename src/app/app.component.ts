import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { ChatbotContainerComponent } from './components/chatbot-container/chatbot-container.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HeaderComponent, ChatbotContainerComponent, LeftPanelComponent, RightPanelComponent, FooterComponent]
})
export class AppComponent { 
  selectedAgent: string = '';

  selectAgent(agent: string) {
    this.selectedAgent = agent;
  }
}

import { Routes } from '@angular/router';
import { ContentFeedComponent } from './components/content-feed/content-feed.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  { path: '', component: ContentFeedComponent }, // Default Home Page
  { path: 'chat', component: ChatComponent },
  { path: 'feed', component: ContentFeedComponent },
  { path: 'right-panel', component: RightPanelComponent }
];

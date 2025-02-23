import { Routes } from '@angular/router';
import { ContentFeedComponent } from './components/content-feed/content-feed.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';

export const routes: Routes = [
  { path: '', component: ContentFeedComponent }, // Default Home Page
  { path: 'feed', component: ContentFeedComponent },
  { path: 'right-panel', component: RightPanelComponent }
];

import { Component } from '@angular/core';

@Component({
  selector: 'app-content-feed',
  standalone: true,
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.scss']
})
export class ContentFeedComponent {
  userProfile: any = null;
  workFeed = [
    { title: 'Mock Task 1', description: 'Complete Angular SSO setup.', timestamp: 'Just now' },
    { title: 'Mock Task 2', description: 'Review API integration.', timestamp: '30 mins ago' },
    { title: 'Mock Task 3', description: 'Sync with team about new updates.', timestamp: '2 hours ago' }
  ];
}

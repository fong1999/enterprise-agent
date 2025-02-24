import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';

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
//implements OnInit {
  // userProfile: any = null;
  // workFeed: any[] = []; // ✅ Mock work feed

  // constructor(private authService: AuthService, private http: HttpClient) {}

  // async ngOnInit() {
  //   console.log("DEBUG: token = before");
  //   const token = await this.authService.getAccessToken(['User.Read']);
  //   console.log("DEBUG: token = ", token);
  //   if (token) {
  //     this.http.get('https://graph.microsoft.com/v1.0/me', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }).subscribe((data) => {
  //       this.userProfile = data;
  //       // ✅ Replace with actual API call later
  //       this.workFeed = [
  //         { title: 'Project Update', description: 'New feature launched!', timestamp: '5 mins ago' },
  //         { title: 'Team Meeting', description: 'Discussing roadmap for next quarter.', timestamp: '1 hour ago' },
  //         { title: 'New Document', description: 'Jane Doe uploaded a new file.', timestamp: '3 hours ago' }
  //       ];
  //     });
  //   } else {
  //     // ✅ Provide mock data when token is unavailable
  //     this.userProfile = { displayName: 'Mock User' };
  //     this.workFeed = [
  //       { title: 'Mock Task 1', description: 'Complete Angular SSO setup.', timestamp: 'Just now' },
  //       { title: 'Mock Task 2', description: 'Review API integration.', timestamp: '30 mins ago' },
  //       { title: 'Mock Task 3', description: 'Sync with team about new updates.', timestamp: '2 hours ago' }
  //     ];
  //   }
  // }
//}
//}
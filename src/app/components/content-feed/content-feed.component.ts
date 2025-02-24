import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-content-feed',
  standalone: true,
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.scss']
})
export class ContentFeedComponent implements OnInit {
  userProfile: any = null;

  constructor(private authService: AuthService, private http: HttpClient) {}

  async ngOnInit() {
    const token = await this.authService.getAccessToken(['User.Read']);
    if (token) {
      this.http.get('https://graph.microsoft.com/v1.0/me', {
        headers: { Authorization: `Bearer ${token}` },
      }).subscribe((data) => {
        this.userProfile = data;
      });
    }
  }
}
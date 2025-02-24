import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
constructor(private msalService: MsalService, private http: HttpClient) {}

  // ✅ Sign in (Redirect-based authentication)
  login() {
    this.msalService.loginRedirect();
  }

  // ✅ Get Access Token for MS Graph API
  async getAccessToken(scopes: string[]): Promise<string | null> {
    const account = this.msalService.instance.getActiveAccount();
    if (!account) {
      this.msalService.loginRedirect();
      return null;
    }

    try {
      const result = await firstValueFrom(this.msalService.acquireTokenSilent({ scopes }));
      return result.accessToken;
    } catch (error) {
      console.error('Token acquisition failed', error);
      return null;
    }
  }

  // ✅ Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.msalService.instance.getActiveAccount();
  }

  async getGraphProfile() {
    const token = await this.getAccessToken(['User.Read']);
    if (!token) return null;

    return this.http.get('https://graph.microsoft.com/v1.0/me', {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }
}

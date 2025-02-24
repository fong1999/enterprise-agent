import { Injectable, inject, Optional } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Optional injection means this will be null if MSAL is disabled
  private msalService = inject(MsalService, { optional: true });
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    // Only initialize if MSAL is enabled
    if (environment.msalEnabled && this.msalService) {
      this.initPromise = this.initialize();
    } else {
      // Mark as initialized if MSAL is disabled
      this.initialized = true;
      console.log('⚠️ MSAL is disabled - using development mode with mock authentication');
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    if (environment.msalEnabled && this.msalService) {
      try {
        await this.msalService.initialize();
        this.initialized = true;
        console.log("✅ MSAL Service is initialized");
      } catch (error) {
        console.error("❌ MSAL Initialization Failed:", error);
        throw error;
      }
    } else {
      this.initialized = true;
    }
  }

  async ensureInitialized(): Promise<void> {
    if (this.initialized) return;
    if (this.initPromise) {
      await this.initPromise;
    } else {
      await this.initialize();
    }
  }

  async login() {
    await this.ensureInitialized();
    if (environment.msalEnabled && this.msalService) {
      this.msalService.loginRedirect();
    } else {
      console.log('⚠️ MSAL disabled: Login redirect skipped');
      // For development, you could add mock login handling here
    }
  }

  async isAuthenticated(): Promise<boolean> {
    await this.ensureInitialized();
    if (environment.msalEnabled && this.msalService) {
      return !!this.msalService.instance.getActiveAccount();
    }
    // Always return "authenticated" when MSAL is disabled
    return true;
  }

  async getAccessToken(scopes: string[]): Promise<string | null> {
    await this.ensureInitialized();
    if (environment.msalEnabled && this.msalService) {
      try {
        const result = await firstValueFrom(this.msalService.acquireTokenSilent({ scopes }));
        return result.accessToken;
      } catch (error) {
        console.error('❌ Token acquisition failed:', error);
        return null;
      }
    }
    // Return a mock token when MSAL is disabled
    return 'mock-dev-token';
  }
}
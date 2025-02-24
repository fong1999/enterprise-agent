import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { MSAL_INSTANCE, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { MSALInstanceFactory } from './app/auth/msal.config';
import { environment } from './environments/environment';
import { ApplicationConfig } from '@angular/core';

// Define a function to get the application config based on MSAL being enabled or not
async function getAppConfig(): Promise<ApplicationConfig> {
  // Get real or mock MSAL instance
  const msalInstance = await MSALInstanceFactory();
  
  if (environment.msalEnabled) {
    // Configuration when MSAL is enabled
    return {
      providers: [
        provideHttpClient(),
        provideRouter([], withComponentInputBinding()),
        { provide: MSAL_INSTANCE, useValue: msalInstance },
        { provide: MsalService, useClass: MsalService },
        { provide: MsalGuard, useClass: MsalGuard },
        { provide: MsalBroadcastService, useClass: MsalBroadcastService }
      ]
    };
  } else {
    // Configuration when MSAL is disabled
    return {
      providers: [
        provideHttpClient(),
        provideRouter([], withComponentInputBinding())
        // No MSAL providers
      ]
    };
  }
}

// Bootstrap the application
(async () => {
  try {
    const appConfig = await getAppConfig();
    await bootstrapApplication(AppComponent, appConfig);
    console.log(`✅ Application bootstrapped successfully (MSAL: ${environment.msalEnabled ? 'Enabled' : 'Disabled'})`);
  } catch (err) {
    console.error('❌ Error during application startup:', err);
  }
})();
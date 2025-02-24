import { PublicClientApplication, LogLevel } from '@azure/msal-browser';
import { environment } from '../../environments/environment';

export const MSALConfig = {
  auth: {
    clientId: environment.msalConfig.clientId,
    authority: `https://login.microsoftonline.com/${environment.msalConfig.tenantId}`,
    redirectUri: environment.msalConfig.redirectUri,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string) => {
        console.log(message);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
}

export const MSALInstanceFactory = async () => {
  // Only create and initialize MSAL if enabled
  if (environment.msalEnabled) {
    const msalInstance = new PublicClientApplication(MSALConfig);
    await msalInstance.initialize();
    return msalInstance;
  }
  
  // Return a mock MSAL instance when disabled
  return {
    initialize: async () => {},
    getActiveAccount: () => ({ username: 'dev@example.com' }),
    // Add more mock methods as needed
  }
}
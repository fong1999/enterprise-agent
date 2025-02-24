import { PublicClientApplication, LogLevel } from '@azure/msal-browser';

export const MSALConfig = {
  auth: {
    clientId: 'your-client-id', // 🔹 Replace with your Azure AD App Registration Client ID
    authority: 'https://login.microsoftonline.com/your-tenant-id', // 🔹 Replace with your Tenant ID
    redirectUri: 'http://localhost:4200', // 🔹 Redirect URL after authentication
  },
  cache: {
    cacheLocation: 'localStorage', // Can be 'sessionStorage' based on security needs
    storeAuthStateInCookie: false, // Recommended for browser scenarios
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
};

export const MSALInstanceFactory = () => new PublicClientApplication(MSALConfig);

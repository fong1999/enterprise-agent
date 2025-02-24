export const environment = {
    production: false,
    msalEnabled: false, // Set to false to disable MSAL
    msalConfig: {
      clientId: 'your-client-id-placeholder', // Will only be used if msalEnabled is true
      tenantId: 'your-tenant-id-placeholder',
      redirectUri: 'http://localhost:4200',
    }
  };
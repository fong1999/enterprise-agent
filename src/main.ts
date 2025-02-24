import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { MSAL_INSTANCE, MsalService, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { MSALInstanceFactory } from './app/auth/msal.config'; // ✅ Import MSAL config

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([])), // ✅ Correct Interceptor setup
    provideRouter([], withComponentInputBinding()), // ✅ Ensure routing is provided
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory }, // ✅ Provide MSAL instance
    MsalService, // ✅ Provide MSAL Service
    MsalGuard, // ✅ Provide MSAL Guard for route protection
  ],
}).catch((err) => console.error(err));

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { authenticationInterceptor } from './services/configuration/http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    DatePipe,
    CurrencyPipe,
  ],
};

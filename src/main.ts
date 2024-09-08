import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { inject, Injector } from '@angular/core';
import { SnackBarHelperService } from './app/shared/helpers/snackbar-helper.service';

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  const injector = inject(Injector);
  const snackBarHelper = injector.get(SnackBarHelperService);

  if (environment.production)
    snackBarHelper.error('Um Error ocorreu ao inicializar a aplicação');
  else console.error(err);
});

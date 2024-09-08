import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarHelperService {
  private defaultConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 3000,
  };

  constructor(private snackBar: MatSnackBar) {}

  success(
    message: string,
    action: string = 'Fechar',
    config?: MatSnackBarConfig
  ) {
    this.showSnackBar(message, action, {
      ...this.defaultConfig,
      panelClass: 'snackbar-success',
      ...config,
    });
  }

  error(
    message: string,
    action: string = 'Fechar',
    config?: MatSnackBarConfig
  ) {
    this.showSnackBar(message, action, {
      ...this.defaultConfig,
      panelClass: 'snackbar-error',
      ...config,
    });
  }

  alert(
    message: string,
    action: string = 'Fechar',
    config?: MatSnackBarConfig
  ) {
    this.showSnackBar(message, action, {
      ...this.defaultConfig,
      panelClass: 'snackbar-alert',
      ...config,
    });
  }

  info(
    message: string,
    action: string = 'Fechar',
    config?: MatSnackBarConfig
  ) {
    this.showSnackBar(message, action, {
      ...this.defaultConfig,
      panelClass: 'snackbar-info',
      ...config,
    });
  }

  custom(
    message: string,
    action: string = 'Fechar',
    classList: string[],
    config?: MatSnackBarConfig
  ) {
    this.showSnackBar(message, action, {
      ...config,
      panelClass: classList,
    });
  }

  private showSnackBar(
    message: string,
    action: string,
    config: MatSnackBarConfig
  ) {
    this.snackBar.open(message, action, config);
  }
}

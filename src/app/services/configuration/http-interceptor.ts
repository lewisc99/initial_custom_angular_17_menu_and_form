import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { SnackBarHelperService } from '../../shared/helpers/snackbar-helper.service';

export const authenticationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const snackBar = inject(SnackBarHelperService);

  const userToken = tokenService.get();
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  });

  return next(modifiedReq).pipe(
    tap(
      (event: HttpEvent<any>) => {},
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          handleErrorResponse(error, router, snackBar, tokenService);
        }
      }
    )
  );
};

const handleErrorResponse = (
  response: HttpErrorResponse,
  router: Router,
  snackBar: SnackBarHelperService,
  tokenService: TokenService
) => {
  if (response.status === 401 || response.status === 403) {
    snackBar.error('Sua sessão expirou, realize Login novamente');

    desconectar(tokenService);
  } else if (response.status === 0) {
    snackBar.error(
      'Erro ao se conectar com Servidor, por favor informe o suporte'
    );

    desconectar(tokenService);
  }
};

const desconectar = (tokenService: TokenService) => {
  tokenService.remove();

  setTimeout(() => {}, 1000);
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.get()) {
    return true;
  }

  router.navigate(['/nao-autorizado']);
  return false;
};

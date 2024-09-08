import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor() {}

  public set(token: string) {
    localStorage.setItem('tokenTest', token);
  }

  public get() {
    return localStorage.getItem('tokenTest');
  }

  public remove() {
    return localStorage.removeItem('tokenTest');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  constructor(private http: HttpClient) {}

  public set(usuario: any) {
    localStorage.setItem('usuarioTest', JSON.stringify(usuario));
  }

  public get(): any {
    return JSON.parse(localStorage.getItem('usuarioTest')!);
  }

  public remove() {
    localStorage.removeItem('usuarioTest');
  }
}

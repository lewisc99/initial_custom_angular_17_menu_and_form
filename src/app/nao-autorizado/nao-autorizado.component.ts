import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-nao-autorizado',
  standalone: true,
  imports: [],
  templateUrl: './nao-autorizado.component.html',
  styleUrl: './nao-autorizado.component.scss',
})
export class NaoAutorizadoComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      window.location.href = '';
    }, 3000);
  }
}

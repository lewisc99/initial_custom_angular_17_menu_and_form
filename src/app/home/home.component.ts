import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [MatCardModule],
})
export class HomeComponent {
  mensagem: string = '';
  formattedDate: string = '';

  ngOnInit() {
    this.upclock();
  }

  upclock() {
    const hoje = new Date();
    const hrs = hoje.getHours();
    const min = hoje.getMinutes();
    const sec = hoje.getSeconds();
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    const diadasemana = [
      'Domingo',
      'Segunda-Feira',
      'Terça-Feira',
      'Quarta-Feira',
      'Quinta-Feira',
      'Sexta-Feira',
      'Sábado',
    ];

    const mes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();
    const semana = diadasemana[hoje.getDay()];
    const dia = hoje.getDate();

    let daytime = 'Tenha uma boa noite';
    if (hrs <= 18) daytime = 'Tenha uma boa tarde';
    if (hrs <= 12) daytime = 'Tenha um bom dia';
    if (hrs <= 6) daytime = 'Ainda acordado?!?!?!?!';

    this.mensagem = `${daytime}`;
    this.formattedDate = `${semana}, ${dia} de ${mes} de ${ano} - ${hrs}:${
      min < 10 ? '0' + min : min
    }:${sec < 10 ? '0' + sec : sec}`;
  }
}

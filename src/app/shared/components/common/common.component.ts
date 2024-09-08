import { Component, OnDestroy, ViewContainerRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DataHelperService } from '../../helpers/data-helper.service';
import { UsuarioService } from '../../../services/configuration/usuario.service';
import { UtilService } from '../../../services/configuration/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../services/configuration/token.service';
import { showfile } from '../../../services/configuration/showfile.service';
import { Subscription } from 'rxjs';
import { SnackBarHelperService } from '../../helpers/snackbar-helper.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'common-component',
  template: '',
  standalone: true,
})
export class CommonComponent implements OnDestroy {
  fornecedor: any = {};
  cbBlackList!: boolean;
  cbAgreementAjustado!: boolean;
  cbVencido!: boolean;
  cbDadosIncorretos!: boolean;
  cbSemPlaca!: boolean;
  cbErroCNPJ!: boolean;
  cbErroValorAgreement!: boolean;
  cbAgreementNaoExiste!: boolean;
  cbAgreementDesagrupar!: boolean;
  cbAgreementAgrupar!: boolean;
  file: any;
  img: any;
  arquivo: any;
  usuario: any = { funcionalidades: [] };
  documentosFiscais!: any[];
  agreement: any;
  placaValida!: boolean;
  cnpjValido!: boolean;

  desblockFornecedor: boolean = false;
  autorizarLancamento: boolean = false;
  notadeletada: boolean = false;

  protected usuarioService = inject(UsuarioService);
  protected utilService = inject(UtilService);
  protected httpClient = inject(HttpClient);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected snackBar = inject(SnackBarHelperService);
  protected vcr = inject(ViewContainerRef);
  protected tokenService = inject(TokenService);
  protected showfile = inject(showfile);
  protected datePipe = inject(DatePipe);
  protected currencyPipe = inject(CurrencyPipe);
  protected fb = inject(FormBuilder);
  protected parentData = inject(MAT_DIALOG_DATA);
  protected dataHelperService = inject(DataHelperService);
  protected modal = inject(MatDialog);

  getFornecedorByCNPJSubscription: Subscription = new Subscription();
  getNotasFiscaisDeletadasSubscription: Subscription = new Subscription();

  constructor() {
    this.usuario = this.usuarioService.get();
  }

  ngOnDestroy(): void {
    this.destroyDefaultSubscriptions();
  }

  destroyDefaultSubscriptions() {
    this.getFornecedorByCNPJSubscription.unsubscribe();
    this.getNotasFiscaisDeletadasSubscription.unsubscribe();
  }

  formatDate(date: Date) {
    const padWithZero = (value: number): string =>
      (value < 10 ? '0' : '') + value;

    const dia: string = padWithZero(date.getDate());
    const mes: string = padWithZero(date.getMonth() + 1);
    const ano: number = date.getFullYear();
    const horas: string = padWithZero(date.getHours());
    const minutos: string = padWithZero(date.getMinutes());
    const segundos: string = padWithZero(date.getSeconds());

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  }
}

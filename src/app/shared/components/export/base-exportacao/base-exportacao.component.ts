import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExportacaoDataRequest } from '../../../../models/exportacao-data-request';
import { saveAs } from 'file-saver';
import { PaginationModel } from '../../../interfaces/filter.model';
import { FormGroup } from '@angular/forms';
import { DataHelperService } from '../../../helpers/data-helper.service';
import { ExportacoesService } from '../../../../services/api/exportacoes.service';
import { Subscription } from 'rxjs';
import { SnackBarHelperService } from '../../../helpers/snackbar-helper.service';

@Component({
  selector: 'app-base-exportacao',
  template: '',
})
export abstract class BaseExportacaoComponent implements OnInit, OnDestroy {
  constructor(
    protected _exportacoesService: ExportacoesService,
    protected snackBar: SnackBarHelperService,
    protected dataHelperService: DataHelperService
  ) {}

  ngOnInit() {
    this.generateCsvSubscription = new Subscription();
    this.getDadosExportarSubscription = new Subscription();

    this.disableExportar = true;
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.generateCsvSubscription.unsubscribe();
    this.getDadosExportarSubscription.unsubscribe();
  }

  @Input() filterFormGroup!: FormGroup;

  paginationModel: PaginationModel = {
    data: [],
    totalSize: 0,
    status: false,
    mensagem: '',
    mensagemException: '',
    totalPages: 0,
  };

  nomeDoArquivo: string = '';

  disableExportar = false;
  isTableLoading = false;

  dadosLista: any[] = [];
  getDadosExportarSubscription!: Subscription;
  generateCsvSubscription!: Subscription;

  fetchData() {
    this.dadosLista = [];
    this.isTableLoading = true;

    let request: ExportacaoDataRequest = new ExportacaoDataRequest(
      this.dataHelperService
    );

    const isDataValid =
      this.filterFormGroup.value.dataInicio !== null &&
      this.filterFormGroup.value.dataFinal !== null;

    if (isDataValid) {
      request.popularClasse(
        this.filterFormGroup.value.dataInicio,
        this.filterFormGroup.value.dataFinal,
        ''
      );
    }

    this.getDadosExportarSubscription = this._exportacoesService
      .getDadosExportar(this.getExportParam(), request)
      .subscribe({
        next: (data: any) => {
          this.paginationModel = data;

          if (data.status) {
            this.disableExportar = isDataValid;
          } else if (data.mensagemException) {
            this.disableExportar = true;
            this.snackBar.error(data.mensagem);
          } else {
            this.disableExportar = true;
            this.snackBar.info(data.mensagem);
          }
          this.isTableLoading = false;
        },
        error: () => {
          this.disableExportar = true;
          this.isTableLoading = false;
        },
      });
  }

  chamaExportacao() {
    this.extrairArquivo();
  }

  extrairArquivo() {
    const dataAtual = new Date();
    let dt_export = this.formatDateToFileName(dataAtual);

    let file_Name = this.getExportFileName().replace('{name}', dt_export);

    this.snackBar.info('Aguarde...Trabalhando em sua solicitação!');

    this.isTableLoading = true;
    this.disableExportar = true;

    this.generateCsvSubscription = this._exportacoesService
      .generateCsv(this.getExportUrl(), file_Name)
      .subscribe({
        next: (data: any) => {
          this.downloadCsv(data, file_Name);
        },
        error: () => {
          this.disableExportar = false;
          this.isTableLoading = false;
        },
      });
  }

  formatDateToFileName(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const hora = ('0' + date.getHours()).slice(-2);
    const minuto = ('0' + date.getMinutes()).slice(-2);

    return `${day}_${month}_${year}_H${hora}M${minuto}`;
  }

  downloadCsv(data: any, File_Name: string) {
    try {
      this.isTableLoading = true;

      const blob = new Blob([data.body], { type: 'application/text' });

      saveAs(blob, File_Name);

      this.snackBar.success('Download realizado com sucesso!');

      this.fetchData();
    } catch (e) {
      this.snackBar.error('Error ao salvar arquivo!');
    }
  }

  protected abstract getExportParam(): string;
  protected abstract getExportUrl(): string;
  protected abstract getExportFileName(): string;
  protected abstract getCsvName(): string;
}

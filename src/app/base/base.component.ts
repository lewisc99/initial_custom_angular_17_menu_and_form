import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../services/configuration/usuario.service';
import { Subscription } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
})
export class BaseComponent implements OnInit, OnDestroy {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.get();

    this.getPermissoesUsuarioAplicacaoSubscription = new Subscription();

    setTimeout(() => {
      this.loadingMenu = false;
    }, 3000);
  }

  ngOnDestroy(): void {
    this.getPermissoesUsuarioAplicacaoSubscription.unsubscribe();
  }

  isCollapsed = false;
  activeRoute: string = '';
  expandedMenu: string | null = null;
  usuario!: any;

  getPermissoesUsuarioAplicacaoSubscription!: Subscription;
  loadingMenu: boolean = true;

  menuItems = [
    {
      text: 'Forms',
      link: 'forms',
      icon: 'publish',
      permitido: true,
      subItens: [
        {
          text: 'Custom Forms',
          link: 'forms',
          icon: 'publish',
          permitido: true,
        },
      ],
    },
    {
      text: 'Other Custom',
      link: 'custom',
      icon: 'emergency_home',
      permitido: true,
      subItens: [
        {
          text: 'pagination',
          link: 'pagination',
          icon: 'payment',
          permitido: true,
        },
        {
          text: 'modals',
          link: 'modals',
          icon: 'account_balance',
          permitido: true,
        },
      ],
    },
  ];

  toggleSubmenu(menuText: string) {
    this.expandedMenu = this.expandedMenu === menuText ? null : menuText;
  }

  isSubmenuExpanded(menuText: string): boolean {
    return this.expandedMenu === menuText;
  }

  isActiveLink(link: string): boolean {
    return this.activeRoute.startsWith(link);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  collapsedMenu() {
    this.isCollapsed = true;
  }

  logout() {
    this.usuarioService.remove();
    setTimeout(() => {}, 1000);
  }
}

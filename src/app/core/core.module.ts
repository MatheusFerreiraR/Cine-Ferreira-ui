import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { SegHttp } from '../seguranca/seg-http';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    ButtonModule,
  ],
  exports: [
    // Componentes exportados para serem utilizados no AppComponent (componente principal)
    NavbarComponent,
  ],
  providers: [
    //colocar services aqui tbm,

    ErrorHandlerService,
    AuthService,
    SegHttp,

    ConfirmationService, // Serviço utilizado para o ConfirmDialog do primeng
    MessageService,
    JwtHelperService,
    Title,
    {provide: LOCALE_ID , useValue: 'pt-BR' }
  ]

})
export class CoreModule { }

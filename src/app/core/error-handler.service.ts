import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { NotAuthenticatedError } from '../seguranca/seg-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
    ) { }

  handle(errorResponse: any) {
    let msgUsuario: string;
    let msgDev: string;

    if (typeof errorResponse === 'string') {
      msgUsuario = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msgUsuario = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {

      msgUsuario = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msgUsuario = 'Você não tem permissão para executar esta ação';
      }

      try {
        msgUsuario = errorResponse.error[0].userMessage;
        msgDev = errorResponse.error[0].devMessage;

        console.error('Ocorreu um erro', errorResponse);
        console.error('Mensagem do desenvolvedor', msgDev);
      } catch (e) { }

    } else {
      msgUsuario = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msgUsuario });
  }
}

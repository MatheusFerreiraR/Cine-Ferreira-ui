import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BodyRequestGetHours, Session } from 'src/app/core/model';
import { SegHttp } from '../seguranca/seg-http';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  sessionUrl: string;

  constructor(private http: HttpClient) {
    this.sessionUrl = `${environment.apiUrl}/session`;
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.sessionUrl)
      .toPromise()
      .then(response => response);
  }

  adicionar(session: Session): Promise<Session | undefined> {
    return this.http.post<Session>(
      //this.lancamentosUrl, lancamento, {headers})
      this.sessionUrl, session)
      .toPromise();
  }

  excluir(codigo: number): Promise<null> {
    //const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.sessionUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  editar(session: Session): Promise<null> {
    return this.http.put<Session>(`${this.sessionUrl}/${session.id}`, session)
      .toPromise()
      .then(() => null);
  }

  ListaHoras(body: BodyRequestGetHours): Promise<any> {
    return this.http.post<Session>(`${this.sessionUrl}/hours`, body)
      .toPromise()
      .then(response => response);
  }
}

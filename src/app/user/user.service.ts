import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from 'src/app/core/model';
import { SegHttp } from '../seguranca/seg-http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userUrl: string;

  constructor(private http: SegHttp) {
    this.userUrl = `${environment.apiUrl}/user`;
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.userUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<null> {
    //const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.userUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}

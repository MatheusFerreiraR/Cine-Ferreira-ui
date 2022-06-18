import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { User } from 'src/app/core/model';
import { SegHttp } from '../seguranca/seg-http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


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
      .then(response => response);
  }

  adicionar(user: User): Promise<User | undefined> {
    return this.http.post<User>(
      //this.lancamentosUrl, lancamento, {headers})
      this.userUrl, user)
      .toPromise();
  }

  excluir(codigo: number): Promise<null> {
    //const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.userUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  editar(user: User): Promise<null> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user)
      .toPromise()
      .then(() => null);
  }

  listarCargos(): Promise<any> {
    return this.http.get<any>(`${this.userUrl}/positions`)
      .toPromise()
      .then(response => response);
  }
}

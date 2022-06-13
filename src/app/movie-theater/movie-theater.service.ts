import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MovieTheater } from 'src/app/core/model';
import { SegHttp } from '../seguranca/seg-http';

@Injectable({
  providedIn: 'root'
})

export class MovieTheaterService {
  movieTheaterUrl: string;

  constructor(private http: HttpClient) {
    this.movieTheaterUrl = `${environment.apiUrl}/movie-theater`;
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.movieTheaterUrl)
      .toPromise()
      .then(response => response);
  }

  adicionar(movieTheater: MovieTheater): Promise<MovieTheater | undefined> {
    return this.http.post<MovieTheater>(
      //this.lancamentosUrl, lancamento, {headers})
      this.movieTheaterUrl, movieTheater)
      .toPromise();
  }

  excluir(codigo: number): Promise<null> {
    //const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.movieTheaterUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  editar(movieTheater: MovieTheater): Promise<null> {
    return this.http.put<MovieTheater>(`${this.movieTheaterUrl}/${movieTheater.id}`, movieTheater)
      .toPromise()
      .then(() => null);
  }
}

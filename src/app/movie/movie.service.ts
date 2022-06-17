import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Movie } from 'src/app/core/model';
import { SegHttp } from '../seguranca/seg-http';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  movieUrl: string;

  constructor(private http: SegHttp) {
    this.movieUrl = `${environment.apiUrl}/movie`;
  }

  listarTodos(): Promise<any> {
    return this.http.get<any>(this.movieUrl)
      .toPromise()
      .then(response => response);
  }

  adicionar(user: Movie): Promise<Movie | undefined> {
    return this.http.post<Movie>(
      //this.lancamentosUrl, lancamento, {headers})
      this.movieUrl, user)
      .toPromise();
  }

  excluir(codigo: number): Promise<null> {
    //const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.movieUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  editar(movie: Movie): Promise<null> {
    return this.http.put<Movie>(`${this.movieUrl}/${movie.id}`, movie)
      .toPromise()
      .then(() => null);
  }

  listarCategorias(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/cat_movie`)
      .toPromise()
      .then(response => response);
  }
}

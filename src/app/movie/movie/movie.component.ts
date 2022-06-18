import { CatMovie, Movie } from '../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Validations } from '../../shared/Validations'
import { Table } from 'primeng/table';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MovieService } from '../movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {

  movies: Movie[] = [];
  form: FormGroup = new FormGroup({});;
  showErrorReq = false
  userMsg = ''
  isEditing = false
  selectedMovie: Movie | undefined
  categorias: CatMovie[] = [];
  rawCategorias: CatMovie[] = [];

  categoriaSelecionada: number | undefined;

  constructor(
    private toasty: ToastrService,
    private MovieService: MovieService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Filmes');
    this.listarTodos();
    this.configurarFormulario();
    this.loadCategories();
  }

  configurarFormulario() {
    this.form = this.formBuilder.group({
      nome: [null, [this.validarCampoObrigatorio, this.validarTamanhoMinimo(2)]],
      categoria: [null, [this.validarCampoObrigatorio]],
      synopsis: [null, [this.validarCampoObrigatorio, this.validarTamanhoMinimo(10)]],
    });
  }

  validarCampoObrigatorio(intput: FormControl) {
    return (intput.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor } };
    }
  }

  listarTodos() {
    this.MovieService.listarTodos()
      .then(resultado => {
        console.log(resultado);
        this.movies = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  submit() {
    if(this.isEditing) {
      this.edit()
    } else {
      this.save()
    }
  }

  save() {
    console.log("salvar")

    const catMovie = this.rawCategorias.find(cat => cat.id == this.categoriaSelecionada);
    const nome = this.form.get('nome')?.value;
    const synopsis = this.form.get('synopsis')?.value;

    if(catMovie != null) {

      const movie = new Movie(undefined , nome, synopsis, catMovie)

      this.MovieService.adicionar(movie)
      .then(() => {
        this.form.reset();
        this.categoriaSelecionada = catMovie.id!
        this.listarTodos();
        this.toasty.success('o filmes '+ nome +' foi cadastrado com sucesso!', 'filmes cadastrado com sucesso!');
      })
      .catch(erro => {
        this.toasty.error('Erro ao tentar cadastrar!');
        this.showErrorReqFunc(erro)
        this.errorHandler.handle(erro)
      });
    }
  }

  edit() {
    if (this.selectedMovie != null) {

      const catMovie = this.rawCategorias.find(cat => cat.id == this.categoriaSelecionada);

      if(catMovie != null) {
        const movieToEdit = new Movie(
          this.selectedMovie.id,
          this.form.get('nome')?.value,
          this.form.get('synopsis')?.value,
          catMovie
        )

        this.MovieService.editar(movieToEdit)
        .then(resultado => {
          this.toasty.success('o filme '+ movieToEdit?.name +' foi editado com sucesso!', 'Filme editado com sucesso!');

          this.stopEdit()
          this.categoriaSelecionada = catMovie.id!
          this.listarTodos()
        })
        .catch(erro => {
          this.toasty.error('Erro ao tentar editar!');
          this.stopEdit()
          this.showErrorReqFunc(erro)
          this.errorHandler.handle(erro)
        });
      }
    }

  }

  deletar(id: number) {
    console.log(this.selectedMovie)

    this.MovieService.excluir(id)
    .then(() => {
      this.form.reset();
      this.listarTodos();
      this.toasty.success('filmes excluído com sucesso!');
    })
    .catch(erro => {
      this.toasty.error('Erro ao tentar excluir!');
      this.errorHandler.handle(erro)
    });
  }

  getMovieToEdit(id: number){
    this.isEditing = true;
    this.showErrorReq = false

    const movie = this.movies.find(movie => movie.id == id);

    this.form.get('nome')?.setValue(movie?.name);
    this.form.get('synopsis')?.setValue(movie?.synopsis);

    if (movie?.catMovie.id != null)
      this.categoriaSelecionada = movie?.catMovie.id

    if(movie != null)
      this.selectedMovie = movie;

    window.scrollTo(0,0);
  }

  stopEdit() {
    this.isEditing = false;
    this.form.reset();
  }

  loadCategories() {
    this.MovieService.listarCategorias()
      .then(lista => {
        this.categorias = lista.map((cat: { description: any; id: any; }) => ({ label: cat.description, value: cat.id }));
        this.rawCategorias = lista
      })
      .catch(error => this.errorHandler.handle(error));
  }

  showErrorReqFunc(erro: HttpErrorResponse) {
    this.showErrorReq = true
    console.log(erro)
    if(erro.error.userMessage != null) {
      this.userMsg = erro.error.userMessage.toUpperCase();
    } else {
      this.userMsg = erro.error[0].userMessage.toUpperCase();
    }
  }

  canShow(value: string) {
    return this.authService.temPermissao(value)
  }

}

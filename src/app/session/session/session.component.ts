import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { SessionService } from '../session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Session, MovieTheater, Movie, BodyRequestGetHours } from '../../core/model';
import { MovieTheaterService } from '../../movie-theater/movie-theater.service';
import { MovieService } from 'src/app/movie/movie.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})

export class SessionComponent implements OnInit {

  sessions: Session[] = [];
  form: FormGroup = new FormGroup({});;
  showErrorReq = false
  userMsg = ''
  isEditing = false
  selectedSession: Session | undefined
  minDate: Date;
  dateValue: Date | undefined;

  movieTheaters: MovieTheater[] = [];
  rawMovieTheaters: MovieTheater[] = [];
  selectedMovieTheater: number | undefined

  movies: Movie[] = [];
  rawMovies: Movie[] = [];
  selectedMovie: number | undefined

  hours: [] = [];
  selectedHours: string = "";
  enableHourDropdown = false

  constructor(
    private toasty: ToastrService,
    private sessionService: SessionService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private formBuilder: FormBuilder,
    private movieTheaterService: MovieTheaterService,
    private movieService: MovieService,
    private authService: AuthService
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.title.setTitle('Sessão');
    this.listarTodas();
    this.listarTodasFilmes();
    this.listarTodasSalas();
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.form = this.formBuilder.group({
      sala: [null, [this.validarCampoObrigatorio]],
      filme: [null, [this.validarCampoObrigatorio]],
      data: [null, [this.validarCampoObrigatorio]],
      hora: [null, [this.validarCampoObrigatorio]]
    });
  }

  validarCampoObrigatorio(intput: FormControl) {
    return (intput.value ? null : { obrigatoriedade: true });
  }

  listarTodas() {
    this.sessionService.listarTodas()
      .then(resultado => {
        console.log(resultado);
        this.sessions = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  listarTodasSalas() {
    this.movieTheaterService.listarTodas()
      .then(resultado => {
        this.movieTheaters = resultado.map((mThea: { identificationNumber: any; id: any; }) => ({ label: mThea.identificationNumber, value: mThea.id }));
        this.rawMovieTheaters = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  listarTodasFilmes() {
    this.movieService.listarTodos()
      .then(resultado => {
        this.movies = resultado.map((mov: { name: any; id: any; }) => ({ label: mov.name, value: mov.id }));

        this.rawMovies = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  listarHorasDisponiveis(dateValueSelected: Date) {
    const movieTheater = this.rawMovieTheaters.find(mThe => mThe.id == this.selectedMovieTheater);

    console.log(dateValueSelected)
    if(movieTheater?.id != null) {

      this.sessionService.ListaHoras(
        new BodyRequestGetHours(
          movieTheater?.id,
          dateValueSelected.toLocaleDateString("pt-BR")
        )
      )
      .then(resultado => {
        this.hours = resultado;
        console.log(this.hours)
        this.enableHourDropdown = true
      })
      .catch(erro => this.errorHandler.handle(erro));
    }
  }

  submit() {
    if(this.isEditing) {
      this.edit()
    } else {
      this.save()
    }
  }

  save() {
    const movieTheater = this.rawMovieTheaters.find(mThe => mThe.id == this.selectedMovieTheater);
    const movie = this.rawMovies.find(mov => mov.id == this.selectedMovie);

    const hora = this.form.get('hora')?.value;

    const dataHora = this.dateValue?.toLocaleDateString("pt-BR") + " " + hora

    if(movie != null && movieTheater != null) {

      const session = new Session(null , movie, movieTheater, dataHora)

      console.log(session)
      this.sessionService.adicionar(session)
      .then(() => {
        this.listarTodas();

        if(this.dateValue != null)
          this.listarHorasDisponiveis(this.dateValue);

        this.toasty.success('Sua sessão foi cadastrada com sucesso!', 'Sessão cadastrada com sucesso!');
      })
      .catch(erro => {
        this.toasty.error('Erro ao tentar cadastrar!');
        this.showErrorReqFunc(erro)
        this.errorHandler.handle(erro)
      });
    }
  }

  edit() {

    const movieTheater = this.rawMovieTheaters.find(mThe => mThe.id == this.selectedMovieTheater);
    const movie = this.rawMovies.find(mov => mov.id == this.selectedMovie);
    const hora = this.form.get('hora')?.value;

    const dataHora = this.dateValue?.toLocaleDateString("pt-BR") + " " + hora

    if (this.selectedSession != null && movie != null && movieTheater != null) {
      const sessionToEdit = new Session(
        this.selectedSession.id,
        movie, movieTheater, dataHora
      )

      this.sessionService.editar(sessionToEdit)
      .then(resultado => {
        this.toasty.success('Sua sessão foi editada com sucesso!', 'Sessão editada com sucesso!');

        this.stopEdit()
        this.listarTodas()
        if(this.dateValue != null)
            this.listarHorasDisponiveis(this.dateValue);
      })
      .catch(erro => {
        this.toasty.error('Erro ao tentar editar!');
        this.stopEdit()
        this.showErrorReqFunc(erro)
        this.errorHandler.handle(erro)
      });
    }
  }

  deletar(id: number) {
    this.sessionService.excluir(id)
      .then(() => {
        this.listarTodas();

        if(this.dateValue != null)
            this.listarHorasDisponiveis(this.dateValue);

        this.toasty.success('Sessão excluída com sucesso!');
      })
      .catch(erro => {
        this.toasty.error('Erro ao tentar excluir!');
        this.errorHandler.handle(erro)
      });
  }

  getSessionToEdit(id: number){
    this.isEditing = true;
    this.showErrorReq = false

    const session = this.sessions.find(ses => ses.id == id);

    this.selectedMovie = session?.movie.id
    this.selectedMovieTheater = session?.movieTheater.id

    if(this.dateValue != null)
          this.listarHorasDisponiveis(this.dateValue);

    if(session != null)
      this.selectedSession = session;

    window.scrollTo(0,0);
  }

  stopEdit() {
    this.isEditing = false;
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

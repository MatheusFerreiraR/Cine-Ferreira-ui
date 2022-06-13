import { MovieTheater } from '../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Validations } from '../../shared/Validations'
import { Table } from 'primeng/table';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MovieTheaterService } from '../movie-theater.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-theater',
  templateUrl: './movie-theater.component.html',
  styleUrls: ['./movie-theater.component.css']
})

export class MovieTheaterComponent implements OnInit {

  movieTheaters: MovieTheater[] = [];
  form: FormGroup = new FormGroup({});;
  showErrorReq = false
  userMsg = ''
  isEditing = false
  selectedMovieTheater: MovieTheater | undefined

  constructor(
    private toasty: ToastrService,
    private movieTheaterService: MovieTheaterService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Salas');
    this.listarTodas();
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.form = this.formBuilder.group({
      num_indentificacao: [null, [this.validarCampoObrigatorio]],
      qtd_assento: [null, [this.validarCampoObrigatorio]]
    });
  }

  validarCampoObrigatorio(intput: FormControl) {
    return (intput.value ? null : { obrigatoriedade: true });
  }

  listarTodas() {
    this.movieTheaterService.listarTodas()
      .then(resultado => {
        console.log(resultado);
        this.movieTheaters = resultado;
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

    const num_indentificacao = this.form.get('num_indentificacao')?.value;
    const qtd_assento = this.form.get('qtd_assento')?.value;


    const movieTheater = new MovieTheater(null , num_indentificacao, qtd_assento)

    this.movieTheaterService.adicionar(movieTheater)
    .then(() => {
      this.form.reset();
      this.listarTodas();
      this.toasty.success('o usuário '+ num_indentificacao +' foi cadastrado com sucesso!', 'Usuário cadastrado com sucesso!');
    })
    .catch(erro => {
      this.toasty.error('Erro ao tentar cadastrar!');
      this.showErrorReqFunc(erro)
      this.errorHandler.handle(erro)
    });
  }

  edit() {
    if (this.selectedMovieTheater != null) {
      const movieTheaterToEdit = new MovieTheater(
        this.selectedMovieTheater.id,
        this.form.get('num_indentificacao')?.value,
        this.form.get('qtd_assento')?.value
      )

      this.movieTheaterService.editar(movieTheaterToEdit)
      .then(resultado => {
        this.toasty.success('A sala '+ movieTheaterToEdit?.identificationNumber +' foi editado com sucesso!', 'Sala editado com sucesso!');

        this.stopEdit()
        this.listarTodas()
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
    console.log(this.selectedMovieTheater)

    this.movieTheaterService.excluir(id)
    .then(() => {
      this.form.reset();
      this.listarTodas();
      this.toasty.success('Sala excluída com sucesso!');
    })
    .catch(erro => {
      this.toasty.error('Erro ao tentar excluir!');
      this.errorHandler.handle(erro)
    });
  }

  getMovieTheaterToEdit(id: string){
    this.isEditing = true;
    this.showErrorReq = false

    const movieTheater = this.movieTheaters.find(movieTheater => movieTheater.identificationNumber == id);

    this.form.get('num_indentificacao')?.setValue(movieTheater?.identificationNumber);
    this.form.get('qtd_assento')?.setValue(movieTheater?.seatQuantity);

    if(movieTheater != null)
      this.selectedMovieTheater = movieTheater;

    window.scrollTo(0,0);
  }

  stopEdit() {
    this.isEditing = false;
    this.form.reset();
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

}

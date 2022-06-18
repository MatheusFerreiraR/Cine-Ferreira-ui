import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Validations } from '../../shared/Validations'
import { Table } from 'primeng/table';

import { PositionCompany, User } from './../../core/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { UserService } from './../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/seguranca/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  users: User[] = [];
  positions: PositionCompany[] = [];
  rawPositions: PositionCompany[] = [];
  selectedPosition: number | undefined
  form: FormGroup = new FormGroup({});;
  showErrorReq = false
  userMsg = ''
  isEditing = false
  selectedUser: User | undefined

  constructor(
    private toasty: ToastrService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Usuários');
    this.listarTodas();
    this.listarCargos();
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.form = this.formBuilder.group({
      nome: [null, [this.validarCampoObrigatorio, this.validarTamanhoMinimo(5)]],
      cpf: [null, [this.validarCampoObrigatorio, this.isValidCpf]],
      email: [null, [this.validarCampoObrigatorio, Validators.email]],
      senha: [null, [this.validarCampoObrigatorio, this.validarTamanhoMinimo(5)]], // Validação customizada aplicada
      cargo: [null, [this.validarCampoObrigatorio]], // Validação customizada aplicada
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

  isValidCpf(input: FormControl) {
      return Validations.ValidaCpf(input.value) ? null : { obrigatoriedade: true };
  }

  listarTodas() {
    this.userService.listarTodas()
      .then(resultado => {
        console.log(resultado);
        this.users = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  listarCargos() {
    this.userService.listarCargos()
      .then(resultado => {
        console.log(resultado);
        this.positions = resultado.map((pos: { description: any; id: any; }) => ({ label: pos.description, value: pos.id }));
        this.rawPositions = resultado;
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

    const position = this.rawPositions.find(pos => pos.id == this.selectedPosition);

    const nome = this.form.get('nome')?.value;
    const cpf = this.form.get('cpf')?.value;
    const email = this.form.get('email')?.value;
    const senha = this.form.get('senha')?.value;

    if(position?.id != null) {
      const user = new User(null , nome, cpf, email, senha, position.id )

      this.userService.adicionar(user)
      .then(() => {
        this.form.reset();
        this.selectedPosition = position.id!
        this.listarTodas();
        this.toasty.success('o usuário '+ nome +' foi cadastrado com sucesso!', 'Usuário cadastrado com sucesso!');
      })
      .catch(erro => {
        this.toasty.error('Erro ao tentar cadastrar!');
        this.showErrorReqFunc(erro)
        this.errorHandler.handle(erro)
      });
    }

  }

  edit() {
    const position = this.rawPositions.find(pos => pos.id == this.selectedPosition);

    if (this.selectedUser != null && position?.id != null) {

      const userToEdit = new User(
        this.selectedUser.id,
        this.form.get('nome')?.value,
        this.form.get('cpf')?.value,
        this.form.get('email')?.value,
        this.form.get('senha')?.value,
        position.id
      )

      this.userService.editar(userToEdit)
      .then(resultado => {
        this.toasty.success('o usuário '+ userToEdit?.nome +' foi editado com sucesso!', 'Usuário editado com sucesso!');
        this.stopEdit()
        this.selectedPosition = position.id!
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
    console.log(this.selectedUser)

    this.userService.excluir(id)
    .then(() => {
      this.form.reset();
      this.listarTodas();
      this.toasty.success('Usuário excluído com sucesso!');
    })
    .catch(erro => {
      this.toasty.error('Erro ao tentar excluir!');
      this.errorHandler.handle(erro)
    });
  }

  getUserToEdit(cpf: string){
    this.isEditing = true;
    this.showErrorReq = false

    const user = this.users.find(user => user.cpf == cpf);

    this.form.get('nome')?.setValue(user?.nome);
    this.form.get('cpf')?.setValue(user?.cpf);
    this.form.get('email')?.setValue(user?.email);

    this.selectedPosition = user?.idPosition

    if(user != null)
      this.selectedUser = user;

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

  canShow(value: string) {
    return this.authService.temPermissao(value)
  }

}

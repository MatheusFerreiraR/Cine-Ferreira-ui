import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  users = [];

  constructor(
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Usuários');
    this.listarTodas();
  }

  listarTodas() {

    this.userService.listarTodas()
      .then(resultado => {
        this.users = resultado.pessoas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

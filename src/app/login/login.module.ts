import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { LoginFormComponent } from './login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';

import { SegHttpInterceptor } from './../seguranca/seg-http-interceptor';
import { AuthGuard } from './../seguranca/auth.guard';

import { environment } from './../../environments/environment';

export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    LoginRoutingModule
  ],

  providers: [
    AuthGuard
  ]
})
export class LoginModule { }

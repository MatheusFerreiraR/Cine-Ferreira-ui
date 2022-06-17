import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { SegHttpInterceptor } from './seg-http-interceptor';

import { AuthGuard } from './auth.guard';
import { environment } from './../../environments/environment';

export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.tokenWhitelistedDomains,
        disallowedRoutes: environment.tokenBlacklistedRoutes
      }
    })
  ],

  providers: [
    AuthGuard
  ]
})
export class SegurancaModule { }

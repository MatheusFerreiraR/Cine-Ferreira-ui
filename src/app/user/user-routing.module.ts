import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    //canActivate: [ AuthGuard ],
    //data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

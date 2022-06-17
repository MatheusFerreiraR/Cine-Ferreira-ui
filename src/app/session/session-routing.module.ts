import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionComponent } from './session/session.component';


const routes: Routes = [
  {
    path: '',
    component: SessionComponent,
    //canActivate: [ AuthGuard ],
    //data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }

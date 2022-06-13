import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieTheaterComponent } from './movie-theater/movie-theater.component';


const routes: Routes = [
  {
    path: '',
    component: MovieTheaterComponent,
    //canActivate: [ AuthGuard ],
    //data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieTheatherServiceRoutingModule { }

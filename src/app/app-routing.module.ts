import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

// Load child adicionado no modulo 21 para carregamento tardio de modulos (Lazy loading)
const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(x => x.UserModule) },
  //{ path: 'login', loadChildren: () => import('./seguranca/seguranca.module').then(x => x.SegurancaModule) },

  //{ path: 'pessoas', loadChildren: './pessoas/pessoas.module#PessoasModule' },
  //{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  //{ path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule' },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

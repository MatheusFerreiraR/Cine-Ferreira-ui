import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { MovieTheatherModule } from './movie-theater/movie-theater.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
    }),

    AppRoutingModule,

    CoreModule,
    SegurancaModule,
    UserModule,
    MovieModule,
    MovieTheatherModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

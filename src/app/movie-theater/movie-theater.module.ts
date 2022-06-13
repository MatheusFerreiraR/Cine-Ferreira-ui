import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { MovieTheaterComponent } from './movie-theater/movie-theater.component';
import { MovieTheatherServiceRoutingModule } from './movie-theater-routing.module';

@NgModule({
  declarations: [
    MovieTheaterComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SharedModule,

    MovieTheatherServiceRoutingModule
  ]
})
export class MovieTheatherModule { }

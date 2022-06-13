import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';

import { MovieComponent } from './movie/movie.component';
import { UserRoutingModule } from './movie-routing.module';

@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    DropdownModule,

    UserRoutingModule
  ]
})
export class MovieModule { }

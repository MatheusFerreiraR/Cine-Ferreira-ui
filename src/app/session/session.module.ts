import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';

import { SessionComponent } from './session/session.component';
import { SessionRoutingModule } from './session-routing.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    SessionComponent
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
    CalendarModule,

    SessionRoutingModule
  ]
})
export class SessionModule { }

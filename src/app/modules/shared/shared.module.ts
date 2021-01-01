import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DataTableComponent } from './data-table.component';

import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatCheckboxModule, MatButtonModule, MatTooltipModule, TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatCheckboxModule, MatButtonModule,
    RouterModule,
    DataTableComponent,
  ],
  declarations: [DataTableComponent],
})
export class DataTableModule {
}

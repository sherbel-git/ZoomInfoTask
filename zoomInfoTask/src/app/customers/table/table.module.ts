import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataTableModule } from 'src/app/shared/_components/data-table/data-table.module';

import { TableComponent } from 'src/app/customers/table/table.component';

import { CustomerService } from 'src/app/shared/_services/http/customer.service';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import { MatTooltipModule } from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import {AuthService} from '../../auth/auth.service';

const routes: Routes = [
  { path: '', component: TableComponent },
];

@NgModule({
  declarations: [TableComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTableModule,
    TranslateModule,
    MatTooltipModule,
    NgxPaginationModule,
  ],
  providers: [CustomerService, NotificationService, AuthService]
})
export class TableModule {
}

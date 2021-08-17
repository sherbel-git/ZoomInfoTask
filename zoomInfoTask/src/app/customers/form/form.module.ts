import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormComponent } from './form.component';

import { MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CustomerService } from 'src/app/shared/_services/http/customer.service';
import { CustomerResolve } from 'src/app/shared/_resolves/customer.resolve';
import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: ':id', component: FormComponent, resolve: { customer: CustomerResolve }}
];

@NgModule({
  declarations: [FormComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule
  ],
  providers: [CustomerService, CustomerResolve, NotificationService]
})
export class FormModule {
}

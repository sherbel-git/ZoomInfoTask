import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {CustomersComponent} from './customers.component';

const routes: Routes = [
  {path: '' , component: CustomersComponent},
];

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CustomersModule {}

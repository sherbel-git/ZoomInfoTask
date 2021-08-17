import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';

import { MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule } from '@angular/material';

import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import {AuthService} from '../auth.service';

const routes: Routes = [
  { path: '', component: SignupComponent },
];

@NgModule({
  declarations: [SignupComponent],
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
  providers: [AuthService, NotificationService]
})
export class SignupModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TranslateModule } from 'src/app/shared/_pipes/translation/translate.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from 'src/app/layout/header/header.module';

import { AppComponent } from './app.component';

import { HelpersService } from 'src/app/shared/_services/generic/helpers.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

import { AuthInterceptor } from './auth/auth-interceptor';
import {AuthService} from './auth/auth.service';
import {CustomerService} from './shared/_services/http/customer.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    TranslateModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    HelpersService,
    NotificationService,
    AuthService,
    CustomerService
  ]
})
export class AppModule {}

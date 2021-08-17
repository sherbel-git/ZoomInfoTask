import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from '../shared/_services/http/base-http.service';


import {AuthDataModel} from './auth-data.model';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService extends BaseHttpService {
  private token: string;
  isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
      const authData: AuthDataModel = {email, password};
      return this.http.post(this.apiUrl + '/api/user/signup', authData);

  }

  login(email: string, password: string) {
    const authData: AuthDataModel = {email, password};
    return this.http.post<{ token: string }>(this.apiUrl + '/api/user/login', authData).subscribe((res) => {
      const token = res.token;
      console.log(token);
      localStorage.setItem('token', token);
      this.token = token;
      this.authStatusListener.next(true);
      // this.router.navigate(['/customers', 'table']);

    });
  }


}

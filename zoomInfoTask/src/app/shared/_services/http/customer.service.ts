import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { CustomerModel } from 'src/app/shared/_models/customer.model';
import {AuthService} from '../../../auth/auth.service';

@Injectable()
export class CustomerService extends BaseHttpService {

  private readonly endPoint = this.apiUrl + '/customer';

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  getItems() {
    return this.http.get<any>(this.apiUrl + '/api/customers');
  }
  getItem(id) {
    return this.http.get<CustomerModel>(this.apiUrl + '/api/customer/' + id).toPromise()
      .then(response => response as CustomerModel).catch(() => null);
  }

  postItem(customer: CustomerModel) {
    console.log(customer);
    return this.http.post<{message: string}>(this.apiUrl + '/api/customer', customer);
  }

}

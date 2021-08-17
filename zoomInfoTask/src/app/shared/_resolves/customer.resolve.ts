import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { CustomerService } from 'src/app/shared/_services/http/customer.service';

import { CustomerModel } from 'src/app/shared/_models/customer.model';

@Injectable()
export class CustomerResolve implements Resolve<CustomerModel> {

  constructor(private customerService: CustomerService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // console.log(route.params.id);
    return this.customerService.getItem(route.params.id).then((response) => response as CustomerModel);
  }
}

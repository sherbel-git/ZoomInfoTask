import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { DataTableComponent } from 'src/app/shared/_components/data-table/data-table.component';

import { CustomerService } from 'src/app/shared/_services/http/customer.service';

import { PencilPaper } from 'src/app/shared/_consts/img-paths';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  items = [];
  pencil = PencilPaper;
  data: any;


  readonly columns = [
    { name: 'idNumber', label: 'BUSINESS_ID_OR_ID_NUMBER' },
    { name: 'name', label: 'NAME' },
    { name: 'phone', label: 'PHONE' },
    { name: 'balance', label: 'BALANCE' },
    { name: 'obligo', label: 'OBLIGO' },
  ];

  constructor(private customerService: CustomerService, private router: Router) {
  }
  ngOnInit() {
    this.customerService.getItems()
      .pipe(map((customerData) => {
       return { items: customerData.items.map((customer) => {
         return {
           id: customer._id,
           idNumber: customer.idNumber,
           firstName: customer.firstName,
           phone1: customer.phone1,
           balance: customer.balance,
           obligo: customer.obligo
         };
       }) };
      }))
      .subscribe((res) => {
      this.data = res;
      console.log(res);
      this.fetchItems();
    });
  }

  fetchItems() {
    this.dataTable.setItems(this.data);
  }


  newCustomer() {
    this.router.navigate(['/customers', 'form']);

  }
}

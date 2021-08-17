import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from 'src/app/shared/_services/http/customer.service';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { CustomerModel } from 'src/app/shared/_models/customer.model';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  readonly errorMessages = ErrorMessages;

  form: FormGroup;
  customer: CustomerModel;

  constructor(private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private customerService: CustomerService,
              private notification: NotificationService) {
  }

  ngOnInit() {
    this.customer = this.route.snapshot.data.customer;
    console.log(this.customer);
    this.form = this.fb.group({
      idNumber: [null],
      firstName: [null, Validators.required],
      phone1: [null],
      obligo: [null],
      balance: [null],
    });

    if (this.customer) {
      this.form.patchValue(this.customer);
    }
  }

  submit() {
    if (this.form.valid) {
      if (!this.customer) {
        this.customerService.postItem(this.form.value).subscribe((res) => {
          this.handleRequest(res);
        });
      }
      this.notification.warning('Update does not work yet ');
    }
  }

  handleRequest(request) {
    if (request) {
      this.notification.success(this.customer ? 'עדכון לקוח ' : 'לקוח חדש',
        this.customer ? 'עדכנת הלקוח בהצלחה' : 'יצרת לקוח בהצלחה');
      this.router.navigate(['/customers', 'table']);
    }
  }

  navigate() {
    this.router.navigate(['/customers', 'table']);
  }
}

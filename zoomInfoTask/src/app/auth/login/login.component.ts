import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorMessages } from 'src/app/shared/_consts/error-messages';
import { CustomerModel } from 'src/app/shared/_models/customer.model';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  readonly errorMessages = ErrorMessages;

  form: FormGroup;
  customer: CustomerModel;

  constructor(private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private notification: NotificationService) {
  }

  ngOnInit() {
    this.customer = this.route.snapshot.data.customer;
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });

    if (this.customer) {
      this.form.patchValue(this.customer);
    }
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.authService.login(this.form.value.email, this.form.value.password);
  }

  handleRequest(request) {
    if (request) {
      this.notification.success(this.customer ? 'עדכון לקוח ' : 'לקוח חדש',
        this.customer ? 'עדכנת הלקוח בהצלחה' : 'יצרת לקוח בהצלחה');
      this.router.navigate(['/customers', 'table']);
    }
  }

  navigate() {
    this.router.navigate(['/users', 'signup']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestCommonService } from 'app/services/rest-common.service';
import { MatDialogRef, MatDatepickerInputEvent } from '@angular/material';
import { Payment } from 'app/models/payment';
import { AppConfig } from 'app/config/app.config';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {

  form: FormGroup;
  payment: Payment;
  minDate: any;
  
  constructor(public matDialogRef: MatDialogRef<CashComponent>,
              private _formBuilder: FormBuilder,
              private restService: RestCommonService) { }

  ngOnInit() {
    this.formValidation();
    this.minDate = new Date();
    this.payment = new Payment();
  }
  
  formValidation() {
    this.form = this._formBuilder.group(
      {
          dateService     : ['', Validators.compose([Validators.required])],
          datePayment     : ['', Validators.compose([Validators.required])],
          amount          : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(9)])],
          concept         : ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
      }
    );
  }

  /**
   * Saves a payment.
   */
  savePayment() {
    this.matDialogRef.close();
    const payload = {
        dateService: this.payment.dateService,
        datePayment: this.payment.datePayment,
        amount: this.payment.amount,
        concept: this.payment.concept,
        typePayment: AppConfig.TYPE_PAYMENTS.CASH
    }

    this.restService.post('/payments', payload)
      .subscribe(result => {
          this.matDialogRef.close(result);
      },
      error => {
        console.error("there was an error sending the payment", error);
      })
  }

  addDateService(event: MatDatepickerInputEvent<Date>) {
    this.payment.dateService = new Date(event.value);
  }

  addDatePayment(event: MatDatepickerInputEvent<Date>) {
    this.payment.datePayment = new Date(event.value);
  }
}

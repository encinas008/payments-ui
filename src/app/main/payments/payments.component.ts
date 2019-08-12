import { Component, OnInit } from '@angular/core';
import { RestCommonService } from 'app/services/rest-common.service';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CustomSortComponent } from '../custom-sort/custom-sort.component';
import { AppConfig } from 'app/config/app.config';
import { CashComponent } from '../create-payment/cash/cash.component';
import { TransferComponent } from '../create-payment/transfer/transfer.component';
import { CheckComponent } from '../create-payment/check/check.component';
import { CardComponent } from '../create-payment/card/card.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  displayedColumns = AppConfig.COLUMNS;
  dataSource: MatTableDataSource<any>;;
  reverse: boolean = true;
  columnName: string = 'typePayment';
  dialogRef: any;

  constructor(private restService: RestCommonService,
              private _matDialog: MatDialog,
              private _matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.setOrder(this.columnName);
  }

  private getAllPayments(columnName) {
    const columns = [
      {
        columnName: columnName,
        order: this.getOrder()
      }
    ];

    this.restService.post('/payments/sort', columns)
      .subscribe(result => {
        this.dataSource.data = result.data;
      },
      error => {
        console.error(error);
      })
  }

  setOrder(value: string) {
    if (this.columnName === value) {
      this.reverse = !this.reverse;
    }

    this.getAllPayments(value);
    this.columnName = value;
  }

  private getOrder() {
    return this.reverse ? 'DESC' : 'ASC'; 
  }

  openMultipleSort() {
    this.dialogRef = this._matDialog.open(CustomSortComponent, {
      width: '60%'
    });
  
    this.dialogRef.afterClosed()
        .subscribe(response => {
          this.restService.post('/payments/sort', response)
          .subscribe(result => {
            this.dataSource.data = result.data;
          },
          error => {
            console.error(error);
          })
        });
  }

  openDialogToCreatePayment(typePayment) {
    const paymentComponent = this.getTypePayment(typePayment);
    this.dialogRef = this._matDialog.open(paymentComponent, {
      width: '60%'
    });
  
    this.dialogRef.afterClosed()
        .subscribe(response => {
          if(response) {
            const oldData = this.dataSource.data;
            oldData.unshift(response.data);
            this.dataSource.data = oldData;

            this._matSnackBar.open(response.message, 'OK', {
              verticalPosition: 'top',
              duration        : 2000
            });
          }
        },
        error => {
          this._matSnackBar.open(error.message, 'OK', {
            verticalPosition: 'top',
            duration        : 2000
          });
          console.error(error);
        });
  }

  getTypePayment(typePayment) {
    let payment = null;
    switch (typePayment) {
      case 'CASH':
        payment = CashComponent;
        break;
      case 'CHECK':
        payment = CheckComponent;
        break;
      case 'CARD':
        payment = CardComponent;
        break;
      case 'TRANSFER':
        payment = TransferComponent;
        break;
    }
    return payment;
  }
}

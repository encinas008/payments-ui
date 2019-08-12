import {Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { AppConfig } from 'app/config/app.config';

@Component({
  selector: 'app-custom-sort',
  templateUrl: './custom-sort.component.html',
  styleUrls: ['./custom-sort.component.scss']
})
export class CustomSortComponent implements OnInit {
  displayedColumns = ['SortBy', 'Order', 'Action'];
  dataSource: MatTableDataSource<any>;
  paymentColumns = AppConfig.PAYMENTS_COLUMNS;

  selectedOrder: string;
  selectedSortBy = 'datePayment';
  orders: any ;

  constructor(public matDialogRef: MatDialogRef<CustomSortComponent>) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.selectedOrder = AppConfig.ORDERS.ASC;
    this.orders = ['ASC', 'DESC']
  }

  addSortBy() {
    const customColumn = {
      columnName: this.selectedSortBy,
      order: this.selectedOrder
    };

    const oldData = this.dataSource.data;
    oldData.push(customColumn);
    this.dataSource.data = oldData;
  }

  delete(index) {
    const oldData = this.dataSource.data;
    oldData.splice(index, 1);
    this.dataSource.data = oldData;
  }

  sort() {
    this.matDialogRef.close(this.dataSource.data);
  }
}

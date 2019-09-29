import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/invoice.model';

@Component({
  selector: 'app-delayed',
  templateUrl: './delayed.component.html',
  styleUrls: ['./delayed.component.css']
})
export class DelayedComponent implements OnInit {
  tableHeaderList=[];
  invoices:Invoice[];
  primaryKeyList=[];
  keyList=['billto','invoicenumber','issuancedate','currencycode','billingamount']
  constructor(private listService:ListService) { }

  ngOnInit() {
    this.tableHeaderList=[
      'Billto','Invoice Number','Issuance Date','Currency Code','Billing Amount'
    ];
    this.invoices=this.listService.getDelayedInvoices();
    this.invoices.forEach(invoice=> this.primaryKeyList.push(invoice.invoiceid));
   
  }
  gotToDetail(event){
    this.listService.goToDetail(event["value"],event["index"],this.primaryKeyList);
  }
}

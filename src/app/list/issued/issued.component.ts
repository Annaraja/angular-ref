import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/invoice.model';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-issued',
  templateUrl: './issued.component.html',
  styleUrls: ['./issued.component.css']
})
export class IssuedComponent implements OnInit {

  tableHeaderList=[];
  invoices:Invoice[];
  primaryKeyList=[];
  keyList=['billto','invoicenumber','issuancedate','currencycode','billingamount']
  constructor(private listService:ListService) { }
  ngOnInit() {
    this.invoices=this.listService.getIssueInvoices();
    this.invoices.forEach(invoice=> this.primaryKeyList.push(invoice.invoiceid));
    this.tableHeaderList=[
      'Billto','Invoice Number','Issuance Date','Currency Code','Billing Amount'
    ];
  }
  gotToDetail(event){
    this.listService.goToDetail(event["value"],event["index"],this.primaryKeyList);
  }
}

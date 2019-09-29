import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/invoice.model';

@Component({
  selector: 'app-suspened',
  templateUrl: './suspened.component.html',
  styleUrls: ['./suspened.component.css']
})
export class SuspenedComponent implements OnInit {
  tableHeaderList=[];
  invoices:Invoice[]=[];
  primaryKeyList=[];
  keyList=['billto','invoicenumber','issuancedate','currencycode','billingamount','suspensionreason'];
  constructor(private listService:ListService) { }

  ngOnInit() {
    this.tableHeaderList=[
      'Billto','Invoice Number','Issuance Date','Currency Code','Billing Amount','Suspension Reason'
    ],
    this.invoices=this.listService.getSuspendedInvoices();
    this.invoices.forEach(invoice=> this.primaryKeyList.push(invoice.invoiceid));
    
  }
  navigateToDetail(invoice:Invoice){
    this.listService.goToDetail(invoice);
  }
  gotToDetail(event){
    this.listService.goToDetail(event["value"],event["index"],this.primaryKeyList);
  }
}

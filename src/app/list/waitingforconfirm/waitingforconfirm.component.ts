import { Subscription } from 'rxjs';
import { InboxListService } from './../../shared/inboxlist/inboxlist.service';
import { ListService } from './../../services/list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Invoice } from 'src/app/model/invoice.model';

@Component({
  selector: 'app-waitingforconfirm',
  templateUrl: './waitingforconfirm.component.html',
  styleUrls: ['./waitingforconfirm.component.css']
})
export class WaitingforconfirmComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.selectedIndexSubscription.unsubscribe();
    this.waitingForInvoiceSubscription.unsubscribe();
  }


tableHeaderList=[];
invoices:Invoice[];
primaryKeyList=[];

keyList=['billto','invoicenumber','issuancedate','currencycode','billingamount','Location'];


activeInvoice:Invoice;
  constructor(private listService :ListService,private inboxListService: InboxListService) { }

  selectedIndexList:number[]=[];
  selectedIndexSubscription:Subscription;
  waitingForInvoiceSubscription:Subscription;
  ngOnInit() {
    this.tableHeaderList=[
      'Billto','Invoice Number','Issuance Date','Billing Amount','Location'
    ]
    this.invoices=this.listService.getWatingForConfirmationInvoices();
    this.waitingForInvoiceSubscription=this.listService.waitingChanges.subscribe(
      (invoiceList)=>{
        this.invoices=invoiceList;
      }
    )
    this.invoices.forEach(invoice=> this.primaryKeyList.push(invoice.invoiceid));
   this.selectedIndexSubscription= this.inboxListService.selectedCheckBoxes.subscribe(
      (indexList)=>{
     this.selectedIndexList=indexList;
     console.log(this.selectedIndexList);
      }
    )
  }

  gotToDetail(event){
    this.listService.goToDetail(event["value"],event["index"],this.primaryKeyList);
  }

  issueInvoice(){
    const invoiceIds=[];
    this.selectedIndexList.forEach(
      (data)=>{
       invoiceIds.push(this.primaryKeyList[data]);
      }
    )
    this.listService.issueInvoice(invoiceIds).subscribe(
(response)=>{
      this.listService.waitingChanges.next(response);
}
    );
  }
}

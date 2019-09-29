import { InvoiceDetailService } from './../invoicedetail.service';
import { Invoice } from 'src/app/model/invoice.model';


import { ListService } from './../../services/list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-invoiceplan',
  templateUrl: './invoiceplan.component.html',
  styleUrls: ['./invoiceplan.component.css']
})
export class InvoiceplanComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
   this.previousChangeSub.unsubscribe();
   this.nextChangesSub.unsubscribe();
  }
 
  

  constructor(private listService:ListService,private activatedRoute:ActivatedRoute,private invoiceDetailService: InvoiceDetailService) { }
  invoicePlanForm:FormGroup;
  editFlag:boolean;
  invoiceId:string;
  previousChangeSub:Subscription;
  nextChangesSub:Subscription;
  updated:boolean;
  ngOnInit() {
    this.invoicePlanForm=new FormGroup(
      {
        'billto':new FormControl(),
        'invoicenumber':new FormControl(),
        'billingamount':new FormControl(),
        'issuancedate':new FormControl()
      }
    );
    this.previousChangeSub= this.listService.previousChanges.subscribe(
      (data)=>{
        this.loadInvoiceById(data);
      }
    )
  this.nextChangesSub= this.listService.nextChanges.subscribe(
     (data)=>this.loadInvoiceById(data)    
   ); 
 if(this.listService.activeInvoice){
  const activeinvoice=this.listService.activeInvoice;
  this.invoiceId=activeinvoice.invoiceid.toString();
 this.invoicePlanForm=new FormGroup(
   {
     'billto':new FormControl(activeinvoice.billto),
     'invoicenumber':new FormControl(activeinvoice.invoicenumber),
     'billingamount':new FormControl(activeinvoice.currencycode+" "+activeinvoice.billingamount),
     'issuancedate':new FormControl(activeinvoice.issuancedate)
   }
 );
 }else{  
 const currentPage = this.activatedRoute.snapshot.params["id"];
 this.invoiceId=this.listService.currentPrimaryKeyList[currentPage];
 this.loadInvoiceById(this.invoiceId);
}
}





loadInvoiceById(invoiceId){
  console.log(invoiceId);
  this.invoiceId=invoiceId;
  this.listService.getInvoiceById(invoiceId).subscribe(
    (response:Invoice)=>{
      const activeinvoice=response;
      this.listService.activeInvoice=activeinvoice;
     this.invoicePlanForm=new FormGroup(
       {
         'billto':new FormControl(activeinvoice.billto),
         'invoicenumber':new FormControl(activeinvoice.invoicenumber),
         'billingamount':new FormControl(activeinvoice.currencycode+" "+activeinvoice.billingamount),
         'issuancedate':new FormControl(activeinvoice.issuancedate)
       }
     );
    }
  )
}
 
saveInvoice(){
  const params=this.invoicePlanForm.value;
  params["invoiceid"]=this.invoiceId;
  params["billingamount"]=234;
    this.invoiceDetailService.updateInvoicePlan(params).subscribe(
    ()=> {
      this.updated=true;
      setTimeout(()=>this.updated =false,2000);
      this.editFlag=!this.editFlag;
      this.listService.activeInvoice.billto=params["billto"];
    }
  );
}
changeEdit(){
this.editFlag=!this.editFlag;
}
}
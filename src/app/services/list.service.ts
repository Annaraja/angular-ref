import { Invoice } from './../model/invoice.model';


import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
import { Router } from "@angular/router";
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http'



@Injectable({
    providedIn:'root'
})
export class ListService{
   

activeInvoice:Invoice;

delayedChanges=new Subject<Invoice[]>();
waitingChanges=new Subject<Invoice[]>();
suspendChanges=new Subject<Invoice[]>();
issuedChanges=new Subject<Invoice[]>();
previousChanges=new Subject<number>();
nextChanges=new Subject<number>();
httpError=new Subject<string>();
currentPrimaryKeyList=[];

private waitingForConfirmationInvoices:Invoice[]=[];
private delayedInvoices:Invoice[]=[];
private suspenedInvoices:Invoice[]=[];
private issuedInvoice:Invoice[]=[];
private allInvoices:Invoice[]=[];
    constructor(private router:Router,private httpClient:HttpClient){

    }

getAllInvoiceDetails(){
this.httpClient.get("/invoices/getAllInvoices").subscribe(
    (response)=>{
this.delayedInvoices=response["delayed"];
this.delayedChanges.next(this.delayedInvoices);
this.waitingForConfirmationInvoices=response["waiting"];
this.waitingChanges.next(this.waitingForConfirmationInvoices);
this.suspenedInvoices=response["suspened"];
this.suspendChanges.next(this.suspenedInvoices);
this.issuedInvoice=response["confirmed"];
this.issuedChanges.next(this.issuedInvoice);
this.allInvoices=response["allInvoices"];
    },
 (error:HttpErrorResponse)=>{
this.httpError.next(error.statusText);
 }   
)
}

issueInvoice(invoiceIds:number[]){
return this.httpClient.post<Invoice[]>("/invoices/issueInvoices",invoiceIds);
}


getFilteredItem(search: any, billtoKey:string,
    invoiceNumberKey:string,billingAmountKey:string,descriptionKey:string) {
      const  value=this.allInvoices.slice();
        const array=[];
        for(const invoice of value){
            const billToValue=invoice[billtoKey].toLowerCase();
            const invoiceNumberValue=invoice[invoiceNumberKey].toLowerCase();
            const descriptionValue=invoice[descriptionKey].toLowerCase();
            const keyword=search.toLocaleLowerCase();
            const billtoIndex= billToValue.search(keyword);
            const invoiceNumberIndex=invoiceNumberValue.search(keyword);
            const descriptionIndex=descriptionValue.search(keyword);
            const billingAmountIndex=(invoice[billingAmountKey].toString()).search(keyword);
       if(invoiceNumberIndex !==-1 || billtoIndex !==-1 || descriptionIndex !==-1 || billingAmountIndex !==-1){
       array.push(invoice);
       }
           }
           return array;
}

doAutoComplete(search: any, billtoKey:string,
    invoiceNumberKey:string,billingAmountKey:string,descriptionKey:string){
        const  value=this.allInvoices.slice();
        const array=[];
        for(const invoice of value){
            const billToValue=invoice[billtoKey].toLowerCase();
            const invoiceNumberValue=invoice[invoiceNumberKey].toLowerCase();
            const descriptionValue=invoice[descriptionKey].toLowerCase();
            const keyword=search.toLocaleLowerCase();
            const billtoIndex= billToValue.search(keyword);
            const invoiceNumberIndex=invoiceNumberValue.search(keyword);
            const descriptionIndex=descriptionValue.search(keyword);
            const billingAmountIndex=(invoice[billingAmountKey].toString()).search(keyword);
            if(invoiceNumberIndex !==-1)
            array.push(invoice.invoicenumber);
            if(billtoIndex!==-1)
            array.push(invoice.billto)
            if(descriptionIndex !==-1)
            array.push(invoice.description)
            if(billingAmountIndex !==-1)
            array.push(invoice.billingamount);
            if(array.length>5)
            break;
        }
        return array;
}

getWatingForConfirmationInvoices(){
    return this.waitingForConfirmationInvoices.slice();
}

getDelayedInvoices(){
    return this.delayedInvoices;
}

getSuspendedInvoices(){
    return this.suspenedInvoices.slice();
}

getIssueInvoices(){
    return this.issuedInvoice.slice();
}

getInvoiceById(invoiceId){
    const httpParams=new HttpParams()
    .set('invoiceId',invoiceId);
 return this.httpClient.get("/invoices/getInvoiceById", {params:httpParams});
}

goToDetail(invoice:Invoice,index?:number,keyList?){
this.currentPrimaryKeyList=keyList;
this.activeInvoice=invoice;
this.router.navigate(['/invoicedetail',index]);
}

getAllInvoices(){
return this.allInvoices.slice();
}

}
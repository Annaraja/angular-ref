import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Invoice } from '../model/invoice.model';
import { InvoiceDetail } from '../model/invoice.detail.model';

@Injectable({providedIn:'root'})
export class InvoiceDetailService{

constructor(private httpClient: HttpClient){

}
updateInvoicePlan(params){
  return  this.httpClient.post("/invoices/updateInvoice",params);
}

updateInvoiceCollect(value){
return this.httpClient.post('/invoices/updateInvoiceCollect',value)
}
saveInvoiceDetail(invoiceDetailList:InvoiceDetail[],invoiceId){
  const httpParams=new HttpParams()
  .set('invoiceid',invoiceId);
  return this.httpClient.post('/invoices/updateInvoiceDetail',invoiceDetailList,{
    params:httpParams
  });
}

}
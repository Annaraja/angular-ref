import { InvoiceDetail } from "./invoice.detail.model";

export class Invoice{

constructor(
    public invoiceid:number ,
    public billto :string,
    public invoicenumber:string,
    public issuancedate:Date,
    public billingamount:number,
    public currencycode:string ='INR',
    public suspendflag ?:boolean,
    public suspensionreason ?:string,
    public location :string="Chennai",
    public invoiceDetail ?:InvoiceDetail[],
    public issuanceFlag ?:string,
    public bankname?:string,
    public accountnumber?:string,
    public ifsccode?:string,
    public branchname?:string,
    public countrycode?:string,
    public description?:string
    ){

      
}

    

}
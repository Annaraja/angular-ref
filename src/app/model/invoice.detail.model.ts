export class InvoiceDetail{
    
constructor(
    public invoiceid:string,
    public rowno:number,
    public item:string,
    public quantity:number=1,
    public unitprice:number=1,
    public price:number=quantity*unitprice
){}

}
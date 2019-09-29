import { InvoiceDetailService } from './../invoicedetail.service';
import { ListService } from 'src/app/services/list.service';
import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/invoice.model';
import { InvoiceDetail } from 'src/app/model/invoice.detail.model';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.css']
})
export class InvoicelistComponent implements OnInit {


  constructor(private listService:ListService,private invoiceDetailService:InvoiceDetailService) { }
  tableHeaderList=[];
  activeInvoice:Invoice;
  gridEdit:string;
  invoiceDetails:InvoiceDetail[];
  updated:boolean;
  totalAmount:number=0;
  ngOnInit() {
    this.tableHeaderList=[
      'Row No','Item','Quantity','Unit Price',' Price'
    ]
    this.activeInvoice=this.listService.activeInvoice;
    this.invoiceDetails=this.activeInvoice.invoiceDetail;
    this.invoiceDetails.forEach(data=>{
      this.totalAmount=this.totalAmount+data.price;
    })

  }

  change(event){
  const content= event.target.textContent;
 this.gridEdit=content;
  console.log(this.gridEdit);
      }

      setToGrid(property,index:number){
        this.invoiceDetails[index][property]=this.gridEdit;
        console.log( this.invoiceDetails[index]);
        this.gridEdit="";
        }

        changeQuantity(event,index,property){
       const content=event.target.textContent;
       if(isNaN(content)){
        event.preventDefault();
        this.invoiceDetails[index][property]="";
        this.invoiceDetails[index]['price']=0;
       }else{
         const initialPrice=this.invoiceDetails[index]['price'];
        this.invoiceDetails[index][property]=content;
        this.invoiceDetails[index]['price']=this.invoiceDetails[index]['unitprice']*content;
        this.totalAmount=this.totalAmount+this.invoiceDetails[index]['price']-initialPrice;
        this.activeInvoice.billingamount=this.totalAmount;
       }
        }

        saveInvoice(){
          const invoice=this.listService.activeInvoice;
        this.invoiceDetailService.saveInvoiceDetail(invoice.invoiceDetail,invoice.invoiceid).subscribe(
          ()=>{
            this.updated=true;
            setTimeout(()=>this.updated =false,2000);
          }
        );
        }
        
}
import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { FormGroup, FormControl } from '@angular/forms';
import { InvoiceDetailService } from '../invoicedetail.service';

@Component({
  selector: 'app-invoicecollect',
  templateUrl: './invoicecollect.component.html',
  styleUrls: ['./invoicecollect.component.css']
})
export class InvoicecollectComponent implements OnInit {

  constructor(private listService:ListService,private invoiceDetail:InvoiceDetailService) { }
  invoiceCollectForm:FormGroup;
  editFlag:boolean;
  invoiceid:number;
  ngOnInit() {
    const activeinvoice=this.listService.activeInvoice;
    this.invoiceid=activeinvoice.invoiceid;
         
this.invoiceCollectForm=new FormGroup(
  {'billto':new FormControl(activeinvoice.billto),
    'branchname':new FormControl(activeinvoice.branchname),
    'ifsccode':new FormControl(activeinvoice.ifsccode),
    'accountnumber':new FormControl(activeinvoice.accountnumber),
    'bankname':new FormControl(activeinvoice.bankname)
  }
);

  }
  saveInvoice(){
    const param=this.invoiceCollectForm.value;
    param["invoiceid"]=this.invoiceid;
this.invoiceDetail.updateInvoiceCollect(param).subscribe();
  }
  changeEdit(){
  this.editFlag=!this.editFlag;
  }
}

import { ListService } from 'src/app/services/list.service';
import { Component, ViewChild, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Invoice } from "src/app/model/invoice.model";




@Component({
selector:'app-search',
templateUrl:'./search.component.html',
styleUrls:['./search.component.css']
})

export class SearchComponent implements OnInit{
    ngOnInit(): void {
        this.tableHeaderList=[
            'Billto','Invoice Number',' Description ','Issuance Date','Billing Amount'
          ];
          this.invoices=[];
    }

    tableHeaderList=[];
    invoices:Invoice[];
    autoComplete=[];
    search:string;
    constructor(private listService:ListService){

    }
    getFilteredData(search){
 if(search){
this.invoices=this.listService.getFilteredItem(search,'billto','invoicenumber','billingamount','description');
this.autoComplete=this.listService.doAutoComplete(search,'billto','invoicenumber','billingamount','description');
 }else{
    this.invoices=[];
    this.autoComplete=[];
 }
    }
    
    keyps(){
        console.log('keyups');
    }
}



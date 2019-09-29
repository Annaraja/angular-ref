import { InvoiceDetailService } from './../invoicedetail.service';
import { ListService } from './../../services/list.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoicedetail',
  templateUrl: './invoicedetail.component.html',
  styleUrls: ['./invoicedetail.component.css']
})
export class InvoicedetailComponent implements OnInit {


presentPage:number;
lastPage:number;
updated:boolean;

  constructor(private activatedRoute:ActivatedRoute,private listService:ListService,private router:Router,
    private invoiceDetailService:InvoiceDetailService) { }
keyList=[];
  ngOnInit() {
    this.presentPage=parseInt(this.activatedRoute.snapshot.params["id"])+1;
    this.keyList=this.listService.currentPrimaryKeyList;
    this.lastPage=this.keyList.length;
    this.activatedRoute.params.subscribe(
(params)=>{
  this.presentPage=parseInt(params["id"])+1;
}
    )
  }
  toPrevious(event){
  console.log(event);
 this.listService.previousChanges.next(event["data"]);
this.router.navigate(["/invoicedetail/",event["index"]]);
  }

  toNext(event){
this.listService.nextChanges.next(event["data"]);
this.router.navigate(["/invoicedetail/",event["index"]]);
  }


}

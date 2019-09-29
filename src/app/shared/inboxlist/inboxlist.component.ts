import { InboxListService } from './inboxlist.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-inboxlist',
  templateUrl: './inboxlist.component.html',
  styleUrls: ['./inboxlist.component.css']
})
export class InboxlistComponent implements OnInit {


@Input("inboxHeader") 
inboxHeader=[];
@Input("dataList") 
dataList:[];
@Input("keyList")
keyList:[];
@Input("useCheckBox")
useCheckBox:boolean;
checkBoxIndex:number;
selectAll:boolean;
selectAllMain:boolean;
@Output()

CheckedList:number[]=[];
@Output()
navigateToDetailScreen=new EventEmitter<{value,index}>();
  constructor(private inboxListService: InboxListService) { }

  ngOnInit() {
  }
  navigateToDetail(value,index){
  this.navigateToDetailScreen.emit({value,index});
  }

  checkAll(event){
    if(event.target.checked){
      this.CheckedList=[];
    for(let i=0;i<this.dataList.length;i++)
    this.CheckedList.push(i);
    this.selectAll=true;
  }
    else{
    this.CheckedList=[];
    this.selectAll=false;
    }
    this.inboxListService.sentSelectedCheckBoxes(this.CheckedList.slice());
  }
  checkIndividual(index:number,event){
    const status=event.target.checked;
    const loca= this.CheckedList.includes(index);
 if(loca){
   const searchedIndex=this.CheckedList.indexOf(index)
this.CheckedList.splice(searchedIndex,1);
 }else{
  this.CheckedList.push(index);
 }
 if(this.CheckedList.length== this.dataList.length) this.selectAllMain=true;
 else this.selectAllMain=false;
this.inboxListService.sentSelectedCheckBoxes(this.CheckedList.slice());
  }

  tableScrolling(event){
    console.log(event)
  }


}

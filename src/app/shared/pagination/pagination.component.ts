import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

@Input("currentPage") currentPage:number;
@Input("totalPage") totalPage:number;
@Input("pagesList") pagesList:[];

@Output("gotNext") gotNext=new EventEmitter<{}>();
@Output("gotPrev") gotPrev=new EventEmitter<{}>();

  constructor(private router:Router) { }

  ngOnInit() {
    console.log('Current Page',this.currentPage);
    console.log('Total page',this.totalPage);
    console.log('Page list',this.pagesList);
  }



onNext(){
const index=this.currentPage;
const data=this.pagesList[index];
 this.gotNext.emit({data,index});
 }

 onPrevious(){
   this.currentPage=this.currentPage-1;
   const index=this.currentPage-1;
   const data:string=this.pagesList[index];
   this.gotPrev.emit({data,index});
 }
}

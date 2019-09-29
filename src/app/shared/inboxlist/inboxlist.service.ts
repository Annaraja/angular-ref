import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



@Injectable({providedIn:'root'})
export class InboxListService{

selectedCheckBoxes=new Subject<number[]>();


sentSelectedCheckBoxes(list:number[]){
    this.selectedCheckBoxes.next(list);
}


}
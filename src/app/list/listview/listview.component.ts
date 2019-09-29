import { Subscription } from 'rxjs';
import { ListService } from './../../services/list.service';
import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceHolderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
   this.waitingSubscrip.unsubscribe();
   this.delaySubscrip.unsubscribe();
   this.suspendSubscrip.unsubscribe();
   this.issuedSub.unsubscribe();
   this.httpErrorSubscription.unsubscribe();
  }

  delayedLength:number;
  delaySubscrip:Subscription;
  waitingLength:number;
  waitingSubscrip:Subscription;
  suspendedLength:number;
  suspendSubscrip:Subscription;
  issuedLength:number;
  issuedSub:Subscription;
  isDelayed:boolean;
  isAvailableForConfirmation:boolean;
  isSuspended:boolean;
  isIssued:boolean;
  isLoading:boolean;
  httpErrorSubscription:Subscription;
  @ViewChild(PlaceHolderDirective) hostPlaceHolder:PlaceHolderDirective;
  alertComponentSubs:Subscription;
  
    constructor(private router:Router,private listService:ListService,
      private componentFactoryResolver: ComponentFactoryResolver) { }
  
  
    ngOnInit() {
      this.isLoading=true;
      this.listService.getAllInvoiceDetails();
     this.httpErrorSubscription= this.listService.httpError.subscribe((message:string)=>{
     this.showAlertError(message);
      })
    this.delaySubscrip= this.listService.delayedChanges.subscribe((data)=>{
       console.log('Delayed',data)
       this.delayedLength=data.length;
       if(this.delayedLength>0)
       this.isDelayed=true;
      });
     this.waitingSubscrip=this.listService.waitingChanges.subscribe((data)=>{
      console.log('Waiting',data)
       this.waitingLength=data.length;
       if(this.waitingLength>0)
       this.isAvailableForConfirmation=true;
     });
    this.suspendSubscrip= this.listService.suspendChanges.subscribe((data)=>{
      console.log('Suspended',data)
       this.suspendedLength=data.length;
       if(this.suspendedLength>0)
       this.isSuspended=true;
     })
this.issuedSub=this.listService.issuedChanges.subscribe((data)=>{
  console.log('confirmed',data)
   this.issuedLength=data.length;
   this.isLoading=false;
   if(this.issuedLength>0)
   this.isIssued=true;
 })
    }
  
    private showAlertError(errorMessage:string){
      const errorComponent=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const viewContainerRef=this.hostPlaceHolder.viewContainerRef;
      viewContainerRef.clear();
      const alertComponentRef=viewContainerRef.createComponent(errorComponent);
      alertComponentRef.instance.message=errorMessage+' Please login again ';
      this.alertComponentSubs=alertComponentRef.instance.close.subscribe( ()=>{
        this.alertComponentSubs.unsubscribe();
        viewContainerRef.clear();
      this.router.navigate(["/auth"]);
      })
      }

    inputSelected(){
      this.router.navigate(['/search']);
    }
    navigateToDelay(){
      this.router.navigate(['/delayed']);
    }
}

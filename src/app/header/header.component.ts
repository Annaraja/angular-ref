import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
    ngOnDestroy(): void {
       this.authSubcription.unsubscribe();
    }

   authenticated:boolean;
   authSubcription:Subscription;

    ngOnInit(): void {
       this.authService.autologin();
       this.authSubcription=this.authService.outhToken.subscribe(
        (token)=>{
         if(token)
           this.authenticated=true;
        }
    )
    }

    url:string="https://www.radiokerry.ie/wp-content/uploads/sites/16/ERP-logo.jpg";

constructor(private authService: AuthService){

}
onLogOut(){
    this.authService.logOut();
}

}
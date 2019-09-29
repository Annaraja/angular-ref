import { Subscription } from 'rxjs';
import { ViewContainerRef, OnDestroy } from '@angular/core';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { OAuth2Token } from './oauth-token.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
   if(this.alertComponentSubs)
   this.alertComponentSubs.unsubscribe();
  }

  constructor(private authService: AuthService,private routers:Router,private componentFactoryResolver: ComponentFactoryResolver) { }
  signUpForm: FormGroup;
  isLoginMode = true;
  isLoading: boolean;
  sucessfullSignUp:boolean;
  error: string = null;
  @ViewChild(PlaceHolderDirective) hostPlaceHolder:PlaceHolderDirective;
  alertComponentSubs:Subscription;
  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]
      ),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.signUpForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]
        ),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
      })
    } else {
      this.signUpForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email], this.duplicateUserName.bind(this)
        ),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
      })
    }
  }

  onSubmit() {
    if (this.signUpForm.invalid)
      return
    this.isLoading = true;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    if (!this.isLoginMode) {
      this.authService.signUp(email, password).subscribe(
        (response) => {
          this.isLoading = false;
          this.error = null;
          this.switchMode();
          this.sucessfullSignUp=true;
         
         
        },
        (httpErrorResponse: HttpErrorResponse) => console.log(httpErrorResponse)
      )
    } else {
      this.authService.login(email, password).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
          this.error=null;
          this.routers.navigate(['/receipes']);
        },
        (errorResponse) => {
          console.log(errorResponse);
          this.isLoading = false;
          this.error = errorResponse;
         this.showAlertError(errorResponse)
        }
      )
    }
  }

  duplicateUserName(formControl: FormControl) {
    return this.authService.checkDuplicateEmail(formControl.value);
  }

  handlingErrors(){
    this.error=null;
  }

private showAlertError(errorMessage:string){
const errorComponent=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
const viewContainerRef=this.hostPlaceHolder.viewContainerRef;
viewContainerRef.clear();
const alertComponentRef=viewContainerRef.createComponent(errorComponent);
alertComponentRef.instance.message=errorMessage;
this.alertComponentSubs=alertComponentRef.instance.close.subscribe( ()=>{
  this.alertComponentSubs.unsubscribe();
  viewContainerRef.clear();

})
}
  log() {
    console.log(this.signUpForm);
    console.log(this.signUpForm.get('email').hasError('duplicateEmail'));
  }

}

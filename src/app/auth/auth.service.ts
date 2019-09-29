import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { OAuth2Token } from './oauth-token.model';
import { Router } from '@angular/router';





@Injectable({providedIn:'root'})
export class AuthService{

constructor(private httpClient:HttpClient,private router:Router){}

outhToken =new BehaviorSubject<OAuth2Token>(null);
private outhTokenAcessToken:string=null;
private tokenExpirationTimer:any;


login(email:string,password:string){
    const body = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');
      const tokenHeaders =new HttpHeaders({
        'Authorization':'Basic ' + btoa('client:password'),
        'Content-type': 'application/x-www-form-urlencoded'
      })
return this.httpClient.post<OAuth2Token>('/oauth/token',body.toString(),{headers:tokenHeaders})
.pipe(
  tap((token:OAuth2Token)=>{
    token['expirationDate']=new Date(new Date().getTime() + (token['expires_in']*100));
    this.outhToken.next(token);
    this.outhTokenAcessToken=token['access_token'];
    this.autoLogOut(token['expires_in']);
    localStorage.setItem('oauthtoken',JSON.stringify(token));
  }
  ),
  catchError((errorResponse:HttpErrorResponse)=>{
    let errordescription = "An unknown error occured.."
    if(errorResponse.error)
    errordescription=errorResponse.error['error_description']
    return throwError(errordescription)
  }
));
}


signUp(email:string,password:string){   
return this.httpClient.post('/authority/signUp',{
    'email':email,
    'password':password
})
}

checkDuplicateEmail(email:string){
return this.httpClient.post("/authority/duplicateEmail",{
  'email':email
}).pipe(
  map(
    (response) => {
      if (response)
        return { 'duplicateEmail': true }
      else
        return null;
    }
  )

);

}

logOut(){
  this.outhToken.next(null);
  localStorage.setItem('oauthtoken',null);
  this.router.navigate(['/auth'])
  if(this.tokenExpirationTimer)
  clearTimeout(this.tokenExpirationTimer);
  this.tokenExpirationTimer=null;
}

autologin(){
 const oauthtoken:OAuth2Token= JSON.parse(localStorage.getItem('oauthtoken'));
 if(!oauthtoken) return ;
 else{
   const expirationDuration=new Date(oauthtoken['expirationDate']).getTime()-new Date().getTime();
   this.outhToken.next(oauthtoken);
   this.autoLogOut(expirationDuration);
 }
}

autoLogOut(expirationDate:number){
this.tokenExpirationTimer=setTimeout(()=>this.logOut,expirationDate*1000);
}

getAccessToken(){
  return this.outhTokenAcessToken;
}

}
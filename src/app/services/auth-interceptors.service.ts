import { AuthService } from '../auth/auth.service'
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { take, exhaust, exhaustMap } from 'rxjs/operators';


@Injectable({providedIn:'root'})
export class AuthInterceptors implements HttpInterceptor{

    constructor(private authService: AuthService){}
    intercept(req:HttpRequest<any>, next: HttpHandler) {     
       return  this.authService.outhToken.pipe( 
            take(1),
             exhaustMap((oauth)=>{
if(!oauth) return next.handle(req);
                 const accessToken=oauth['access_token'];
                 const modifiedReq=req.clone({headers:req.headers.append('Authorization','bearer'+" "+accessToken)})
                 return next.handle(modifiedReq);
             })
        )
    
    }

}
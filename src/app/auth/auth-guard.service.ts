import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { take, map, tap } from 'rxjs/operators';



@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

constructor(private authService:AuthService,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
     return this.authService.outhToken.pipe(take(1),map(
   (auth)=>  !!auth
     ),tap((outh)=>{
         if(!outh)
        return this.router.navigate(['/auth']);
     }));
       
    }

}
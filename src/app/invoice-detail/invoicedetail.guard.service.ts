import { ListService } from 'src/app/services/list.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from "@angular/core";


@Injectable({providedIn:'root'})
export class InvoiceDetailGuard implements CanActivate{

constructor(private listService :ListService,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
       const keyList= this.listService.currentPrimaryKeyList;
if(keyList.length>0){
return true;
}else {
    return this.router.navigate(['/']);
}
    }

}
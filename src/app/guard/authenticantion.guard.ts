import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate{

  constructor(private router : Router, private userService : UserService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isLoggedIn !== true) {
      window.alert("Access not allowed!");
      this.router.navigate(['log-in'])
    }
    return true;
  }

  // canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean{
  //   if(this.userService.getAccessTokenFromCache()){
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }

}

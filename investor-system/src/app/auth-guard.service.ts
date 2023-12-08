//import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { authService } from "./service/auth.service";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthGuardFN implements CanActivate {
    constructor(private authService: authService, private router: Router, private toasterService: ToastrService){};
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot):boolean | Observable<boolean> {
        
        return this.authService.isLoggedInUserAdmin().pipe(map((User) => {
            if (User && User["investor-system"]["roles"].includes('admin')) {                
                return true;
            }
            this.toasterService.error('You are not authorize to visit this page!!!');
            this.router.navigate(['/list']);
            return false;
        }), catchError((error) => {
            this.toasterService.error('You are not authorize to visit this page!!!');
            this.router.navigate(['/list']);
            return of(false);
        }));           
    }
}
  
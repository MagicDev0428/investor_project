import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, of , map} from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class authService {
  
    userIsAdmin = false;
    constructor(private authService: AuthService) {
       
    }

    isLoggedInUserAdmin(){

        
    //  this.authService.user$.pipe(map((User) => {
    //     console.log(User);
    //     if(User && User["investor-system"]["roles"].includes('admin')) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //   }))
    // }
    return this.authService.user$;
//    return this.authService.user$.subscribe(User => {
//             console.log(User);
//         if(User && User["investor-system"]["roles"].includes('admin')) {
//             this.userIsAdmin = true;
//             return true;
//         } else {
//             this.userIsAdmin = true;
//             return false;
            
//         }
//       })
//     }
    }
}
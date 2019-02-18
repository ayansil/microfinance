import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class PagesVerifierService implements CanActivate {

  constructor(public router: Router,private cookieService: CookieService) {}
 
  canActivate(): boolean {
    if(!this.cookieService.check('token')){
      
        this.router.navigate(['/authentication']);
        return false;
  
    }
    return true;
  }
 

}
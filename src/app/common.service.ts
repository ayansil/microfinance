import { Injectable } from '@angular/core';
import { config } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root',
})
export class CommonService {

    private config:Object={
        base_url:'http://localhost/microfinance/microfinance_api/public/api', //
    };

    constructor(private cookieService: CookieService,private router: Router) { 

    }
    getConfig(){
        return this.config;
    }
    checkLoggedIn(){
        if(this.cookieService.check('token'))
        {
            return true;
        }
        else{
            this.router.navigate(['/authenticate']);
            return false;
        }
    }


 

}
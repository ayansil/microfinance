import { Injectable } from '@angular/core';
import { config } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class CommonService {

    private config: Object = {
        base_url: 'http://localhost/microfinance/microfinance_api/public/api',
    };

    constructor(private cookieService: CookieService, private router: Router) {

    }
    getConfig() {
        return this.config;
    }
    checkLoggedIn() {
        if (this.cookieService.check('token')) {
            return true;
        } else {
            this.router.navigate(['/authenticate']);
            return false;
        }
    }
    isValidDate (dateString) {
      const regEx = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateString.match(regEx)) return false;  // Invalid format
      const d = new Date(dateString);
      if (Number.isNaN(d.getTime())) return false; // Invalid date
      return d.toISOString().slice(0, 10) === dateString;
    }




}

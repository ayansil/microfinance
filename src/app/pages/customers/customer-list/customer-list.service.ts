import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {CommonService} from '../../../common.service';

import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomerListService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    private config: any = {};
    private base_url: string= '';

    constructor(private commonService: CommonService,
      private http: HttpClient,
      private cookieService: CookieService,
      private router: Router) {
        this.config = commonService.getConfig();
        this.base_url = this.config.base_url;
    }

    list(page, search) {
        if (this.commonService.checkLoggedIn()) {
            const token = this.cookieService.get('token');
            let listData = search;
            listData['token'] = token;
            return this.http.post(this.base_url + '/customerlist?page=' + page, listData, this.httpOptions);
        }
    }
    add(data) {
        if (this.commonService.checkLoggedIn()) {
            const token = this.cookieService.get('token');
            const customerData = data;
            customerData.token = token;
            return this.http.post(this.base_url + '/addcustomer', customerData, this.httpOptions);
        }
    }
    edit(data) {
      if (this.commonService.checkLoggedIn()) {
        const token = this.cookieService.get('token');
        const customerData = data;
        customerData.token = token;
        return this.http.post(this.base_url + '/editcustomer', customerData, this.httpOptions);
      }
    }

}

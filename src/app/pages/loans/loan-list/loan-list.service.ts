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
export class LoanListService {

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

    list(page,customer_id) {
        if (this.commonService.checkLoggedIn()) {
            const token = this.cookieService.get('token');
            let listData = {};
            listData['token'] = token;
            listData['customer_id'] = customer_id;
            return this.http.post(this.base_url + '/loanlist?page=' + page, listData, this.httpOptions);
        }
    }
    add(data) {
        if (this.commonService.checkLoggedIn()) {
            const token = this.cookieService.get('token');
            const loanData = data;
            loanData.token = token;
            return this.http.post(this.base_url + '/addloan', loanData, this.httpOptions);
        }
    }
    edit(data) {
      if (this.commonService.checkLoggedIn()) {
        const token = this.cookieService.get('token');
        const loanData = data;
        loanData.token = token;
        return this.http.post(this.base_url + '/editloan', loanData, this.httpOptions);
      }
    }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {CommonService} from "../../../common.service";

import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class BranchListService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private config:any = {};
    private base_url:string='';

    constructor(private commonService:CommonService,private http: HttpClient,private cookieService: CookieService,private router: Router){ 
        this.config=commonService.getConfig();
        this.base_url=this.config.base_url;
    }

    list(page){
        if(this.commonService.checkLoggedIn()){
            let token=this.cookieService.get('token');
            let listData={
                'token':token
            }
            return this.http.post(this.base_url+'/branchlist?page='+page,listData, this.httpOptions);
        }
    }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {CommonService} from "../common.service"

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private config:any = {};
  private base_url:string='';

  constructor(private commonService:CommonService,private http: HttpClient) {
    this.config=commonService.getConfig();
    this.base_url=this.config.base_url;
  }

  login(username:string,password:string){
    let loginData={
      email:username,
      password:password
    };

    return this.http.post(this.base_url+'/login',loginData, this.httpOptions);
  }

  }

}

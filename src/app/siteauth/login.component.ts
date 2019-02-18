import { Component } from '@angular/core';
import {LoginService} from './login.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";
import { ToasterConfig } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    button{
      cursor:pointer !important;
    }
    button:disabled {
      cursor: not-allowed !important;
    }
  `],
})
export class LoginComponent {

  username:string='';
  password:string='';
  authenticating:boolean=false;
  index=0;

  constructor( private loginService:LoginService,private cookieService: CookieService,private router: Router,private toastrService: NbToastrService,private toastr: ToastrService ) {
    
  }


  ngOnInit() { 
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
    
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 6000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  login(){
    this.authenticating=true;
    this.loginService.login(this.username,this.password).subscribe((data:any) => {
      if(data.status){
        let token=data.data.token;
        this.cookieService.set('token',token);
        this.router.navigate(['/pages']);
        //this.showToast(NbToastStatus.SUCCESS,'Authentication Successfull !!!','Please wait we are redirecting you to your dashboard ...');
        this.toastr.success('Please wait we are redirecting you to your dashboard ...','Authentication Successfull !!!',{
          timeOut: 2000,
          closeButton:true,
          
        });

      }else{
        //this.showToast(NbToastStatus.DANGER,'Authentication Failed !!!','Please check your username and password.');
        this.toastr.error('Please check your username and password.','Authentication Failed !!!',{
          timeOut: 6000,
          closeButton:true,
        });
      }
      this.authenticating=false;
    });
    return false;
  }


}

import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class LoginComponent {

  username:string='';
  password:string='';

  constructor() {
  }
  ngOnInit() { // In the ngOnInit() or in the constructor
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }
  login(){
   console.log('in login with'+this.username+"===>"+this.password); 
   return false;
  }


}

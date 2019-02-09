import { NgModule } from '@angular/core';

import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {LoginComponent} from './login.component'


@NgModule({
  imports: [
    AuthenticationRoutingModule,
    ThemeModule,
    MiscellaneousModule,
  ],
  declarations: [
    AuthenticationComponent,
    LoginComponent

  ],
})
export class SiteModule {
}

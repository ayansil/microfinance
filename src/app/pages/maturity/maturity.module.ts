import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { maturityRoutingModule, routedComponents } from './maturity-routing.module';
 
@NgModule({
  imports: [
    ThemeModule,
    maturityRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents
  ],
})

export class MaturityModule { }


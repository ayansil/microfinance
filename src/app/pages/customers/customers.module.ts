import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomersRoutingModule, routedComponents } from './customers-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    CustomersRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class CustomersModule { }

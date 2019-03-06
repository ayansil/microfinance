import { CustomerBranchEditComponent } from './customer-list/customerBranchEditComponent';
import { CustomerEditComponent } from './customer-list/CustomerEditComponent';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomersRoutingModule, routedComponents } from './customers-routing.module';
import { AddCustomerModalComponent } from './customer-list/modal/add.customer.modal.component';
import { EditCustomerModalComponent } from './customer-list/modal/edit.customer.modal.component';

@NgModule({
  imports: [
    ThemeModule,
    CustomersRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    AddCustomerModalComponent,
    CustomerEditComponent,
    EditCustomerModalComponent,
    CustomerBranchEditComponent,
  ],
  entryComponents: [
    AddCustomerModalComponent,
    CustomerEditComponent,
    EditCustomerModalComponent,
    CustomerBranchEditComponent,
  ],
})
export class CustomersModule { }

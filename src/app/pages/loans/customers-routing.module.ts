import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
const routes: Routes = [{
  path: '',
  component: CustomersListComponent,
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule { }

export const routedComponents = [
  CustomersComponent,
  CustomersListComponent
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoansComponent } from './loans.component';

import { LoanListComponent } from './loan-list/loan-list.component';
const routes: Routes = [{
  path: ':id',
  component: LoanListComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoansRoutingModule { }

export const routedComponents = [
  LoansComponent,
  LoanListComponent,
];

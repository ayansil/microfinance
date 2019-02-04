import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoansComponent } from './loans.component';
import { LoansListComponent } from './loans-list/loans-list.component';
const routes: Routes = [{
  path: ':id',
  component: LoansListComponent,
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class loansRoutingModule { }

export const routedComponents = [
  LoansComponent,
  LoansListComponent
];

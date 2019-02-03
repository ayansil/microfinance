import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loansComponent } from './loans.component';
import { loansListComponent } from './loans-list/loans-list.component';
const routes: Routes = [{
  path: '',
  component: loansListComponent,
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class loansRoutingModule { }

export const routedComponents = [
  loansComponent,
  loansListComponent
];

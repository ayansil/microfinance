import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { maturityComponent } from './maturity.component';
import { maturityListComponent } from './maturity-list/maturity-list.component';
const routes: Routes = [{
  path: ':id',
  component: maturityListComponent,
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class maturityRoutingModule { }

export const routedComponents = [
  maturityComponent,
  maturityListComponent
];

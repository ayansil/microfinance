import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchesComponent } from './branches.component';

import { BranchListComponent } from './branch-list/branch-list.component';
const routes: Routes = [{
  path: '',
  component: BranchListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule { }

export const routedComponents = [
  BranchesComponent,
  BranchListComponent
];

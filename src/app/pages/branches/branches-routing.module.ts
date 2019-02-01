import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchesComponent } from './branches.component';

import { AddBranchComponent } from './add-branch/add-branch.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';
const routes: Routes = [{
  path: '',
  component: BranchesComponent,
  children: [{
    path: 'list',
    component: BranchListComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule { }

export const routedComponents = [
  BranchesComponent,
  AddBranchComponent,
  EditBranchComponent,
  BranchListComponent
];

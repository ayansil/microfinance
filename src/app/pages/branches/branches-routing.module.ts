import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchesComponent } from './branches.component';
const routes: Routes = [{
  path: '',
  component: BranchesComponent,
  children: [{
    path: 'list',
    component: BranchesComponent,
  },
  {
    path: 'add',
    component: BranchesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule { }

export const routedComponents = [
  BranchesComponent
];

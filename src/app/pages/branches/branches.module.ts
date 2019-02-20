import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { BranchesRoutingModule, routedComponents } from './branches-routing.module';
import { AddBranchModalComponent } from './branch-list/modal/add.branch.modal.component';
@NgModule({
  imports: [
    ThemeModule,
    BranchesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    AddBranchModalComponent,
  ],
  entryComponents: [
    AddBranchModalComponent,
  ],
})
export class BranchesModule { }

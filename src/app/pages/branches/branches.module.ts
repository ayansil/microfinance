import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { BranchesRoutingModule, routedComponents } from './branches-routing.module';
import { AddBranchModalComponent } from './branch-list/modal/add.branch.modal.component';
import { EditBranchModalComponent } from './branch-list/modal/edit.branch.modal.component';
import { BranchEditComponent } from './branch-list/BranchEditComponent';
@NgModule({
  imports: [
    ThemeModule,
    BranchesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    AddBranchModalComponent,
    BranchEditComponent,
    EditBranchModalComponent,
  ],
  entryComponents: [
    AddBranchModalComponent,
    BranchEditComponent,
    EditBranchModalComponent,
  ],
})
export class BranchesModule { }

import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { BranchesRoutingModule, routedComponents } from './branches-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    BranchesRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class BranchesModule { }

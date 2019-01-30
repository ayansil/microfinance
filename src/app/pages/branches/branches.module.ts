import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { BranchesRoutingModule, routedComponents } from './branches-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    BranchesRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class BranchesModule { }

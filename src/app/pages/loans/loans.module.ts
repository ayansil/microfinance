import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { loansRoutingModule, routedComponents } from './loans-routing.module';
import { LoansRenderComponent} from '.customers/customers-list/loans.render.component';

@NgModule({
  imports: [
    ThemeModule,
    loansRoutingModule,
    Ng2SmartTableModule
  ],
  entryComponents: [LoansRenderComponent,],
  declarations: [
    ...routedComponents,
    LoansRenderComponent
  ],
})
export class loansModule { }

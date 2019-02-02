import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomersRoutingModule, routedComponents } from './customers-routing.module';
import { LoansRenderComponent} from './customers-list/loans.render.component';

@NgModule({
  imports: [
    ThemeModule,
    CustomersRoutingModule,
    Ng2SmartTableModule
  ],
  entryComponents: [LoansRenderComponent,],
  declarations: [
    ...routedComponents,
    LoansRenderComponent
  ],
})
export class CustomersModule { }

import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { loansRoutingModule, routedComponents } from './loans-routing.module';
import { InstallmentsRenderComponent} from './loans-list/installments.render.component';
 
@NgModule({
  imports: [
    ThemeModule,
    loansRoutingModule,
    Ng2SmartTableModule
  ],
  entryComponents: [InstallmentsRenderComponent,],
  declarations: [
    ...routedComponents,
    InstallmentsRenderComponent
  ],
})

export class LoansModule { }

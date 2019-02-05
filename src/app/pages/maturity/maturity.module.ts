import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { maturityRoutingModule, routedComponents } from './maturity-routing.module';
import { InstallmentsRenderComponent} from './maturity-list/installments.render.component';
 
@NgModule({
  imports: [
    ThemeModule,
    maturityRoutingModule,
    Ng2SmartTableModule
  ],
  entryComponents: [InstallmentsRenderComponent,],
  declarations: [
    ...routedComponents,
    InstallmentsRenderComponent
  ],
})

export class MaturityModule { }


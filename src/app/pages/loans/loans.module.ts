import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { LoansRoutingModule, routedComponents } from './loans-routing.module';
import { AddLoanModalComponent } from './loan-list/modal/add.loan.modal.component';
import { EditLoanModalComponent } from './loan-list/modal/edit.loan.modal.component';
import { LoanEditComponent } from './loan-list/LoanEditComponent';
@NgModule({
  imports: [
    ThemeModule,
    LoansRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    AddLoanModalComponent,
    LoanEditComponent,
    EditLoanModalComponent,
  ],
  entryComponents: [
    AddLoanModalComponent,
    LoanEditComponent,
    EditLoanModalComponent,
  ],
})
export class LoansModule { }

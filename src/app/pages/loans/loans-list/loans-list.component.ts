
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LoanTableData } from '../../../@core/data/loan-table';
import { InstallmentsRenderComponent} from './installments.render.component'
@Component({
  selector: 'loans-list',
  templateUrl: './loans-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class LoansListComponent {

settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      installments: {
        title: 'View Installments',
        type: 'custom',
        renderComponent: InstallmentsRenderComponent,
        defaultValue: "",
        editor: {
          type: 'custom',
          component: InstallmentsRenderComponent,
        },
      },
      id: {
        title: 'ID',
        type: 'number',
      },
      loan_date: {
        title: 'Loan Date',
        type: 'date',
      },
      loan_amt: {
        title: 'Loan Amount',
        type: 'number',
      },
      with_sc:{
        title: 'With S/C',
        type: 'number' 
      },
      loan_cycle:{
        title: 'Loan Cycle',
        type: 'number'
      }
      
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: LoanTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}




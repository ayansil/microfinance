
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MaturityTableData } from '../../../@core/data/maturity-table';

@Component({
  selector: 'maturity-list',
  templateUrl: './maturity-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class maturityListComponent {

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
    id: {
        title: 'ID',
        type: 'number',
      },
      amount: {
        title: 'Amount',
        type: 'number',
      },
      date:{
        title: 'Date',
        type: 'string'
      },
      maturity_amt: {
        title: 'Maturity Amount',
        type: 'number',
      },
      days:{
        title: 'Days',
        type: 'number' 
      },
      day:{
        title: 'Day',
        type: 'number' 
      },
      balance:{
        title: 'Balance',
        type: 'number'
      },
      status:{
        title: 'Status',
        type: 'string'
      }
      
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: MaturityTableData) {
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




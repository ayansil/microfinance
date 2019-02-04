import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerTableData } from '../../../@core/data/customer-table';
import { LoansRenderComponent} from './loans.render.component';
import { MaturityRenderComponent } from './maturity.render.component';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class CustomersListComponent {

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
      loans: {
        title: 'View Loans',
        type: 'custom',
        renderComponent: LoansRenderComponent,
        defaultValue: "",
        filter:false,
        sort:false,
        editor: {
          type: 'custom',
          component: LoansRenderComponent,
        },
      },
      maturity: {
        title: 'Maturity',
        type: 'custom',
        renderComponent: MaturityRenderComponent,
        filter:false,
        sort:false,
        defaultValue: "",
        editor: {
          type: 'custom',
          component: MaturityRenderComponent,
        },
      },
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      address:{
        title: 'Address',
        type: 'string' 
      },
      phone:{
        title: 'Phone No.',
        type: 'number'
      },
      nominee_firstname:{
        title: 'Nominee First Name',
        type: 'string'
      },
      nominee_lastname:{
        title: 'Nominee Last Name',
        type: 'string'
      },
      relation_with_nominee:{
        title: 'Relation With Nominee',
        type: 'string'
      }
      
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: CustomerTableData) {
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




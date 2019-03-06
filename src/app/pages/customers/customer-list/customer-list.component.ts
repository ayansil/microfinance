import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerListService } from './customer-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerModalComponent } from './modal/add.customer.modal.component';
import {Router} from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';
import { CustomerEditComponent} from './CustomerEditComponent';
import { EditCustomerModalComponent } from './modal/edit.customer.modal.component';
import { CustomerBranchEditComponent } from './customerBranchEditComponent';
@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class CustomerListComponent {

  hasPrevious: boolean= false;
  hasNext: boolean= false;
  last_page= 1;
  current_page= 1;
  pages: any[];
  loadingData = 0;
  search= {
    branch_name: '',
    address: '',
    first_name: '',
    last_name: '',
    nominee_first_name: '',
    nominee_last_name: '',
    phone: '',
    nominee_relation: '',
  };
settings = {
    actions: {
      add: false,
      edit: false,
      position: 'right',
    },
    hideSubHeader: true,
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      edit: {
        title: 'Edit',
        type: 'custom',
        renderComponent: CustomerEditComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe(row => {
           this.showEditCustomerModal(row);
          });
        },
        defaultValue: '',
        filter: false,
        sort: false,
        editor: {
          type: 'custom',
          component: CustomerEditComponent,
        },
      },
      first_name: {
        title: 'First Name',
        type: 'string',
        filter: false,
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
        filter: false,
      },
      address: {
        title: 'Address',
        type: 'string',
        filter: false,
      },
      phone: {
        title: 'Phone',
        type: 'number',
        filter: false,
      },
      nominee_first_name: {
        title: 'Nominee First Name',
        type: 'string',
        filter: false,
      },
      nominee_last_name: {
        title: 'Nominee Last Name',
        type: 'string',
        filter: false,
      },
      nominee_relation: {
        title: 'Relation with nominee',
        type: 'string',
        filter: false,
      },
      branch: {
        title: 'Branch',
        type: 'custom',
        renderComponent: CustomerBranchEditComponent,
        defaultValue: '',
        filter: false,
        sort: false,
        editor: {
          type: 'custom',
          component: CustomerBranchEditComponent,
        },
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private customerListService: CustomerListService,
    private modalService: NgbModal,
    private router: Router,
    private toastrService: NbToastrService,
    private toastr: ToastrService) {
    this.fetchData();
  }

  showAddCustomerModal() {

    const activeModal = this.modalService.open(AddCustomerModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Customer';
    activeModal.result.then((result) => {
      if (result === 'Customer Created') {
        this.customerCreated();
      }
    });


  }
  showEditCustomerModal(row) {

    const activeModal = this.modalService.open(EditCustomerModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Edit Customer';
    activeModal.componentInstance.rowData = row;
    activeModal.result.then((result) => {
      if (result === 'Customer Edited') {
        this.customerEdited();
      }
    });


  }
  customerCreated() {
    this.current_page = 1;
    this.fetchData();
  }
  searchCustomer() {
    this.current_page = 1;
    this.fetchData();
  }
  clearSearch() {
    this.search = {
      branch_name: '',
      address: '',
      first_name: '',
      last_name: '',
      nominee_first_name: '',
      nominee_last_name: '',
      phone: '',
      nominee_relation: '',
    };
    this.current_page = 1;
    this.fetchData();
  }

  customerEdited() {
    this.fetchData();
  }

  fetchData() {
    this.loadingData = 1;
    this.customerListService.list(this.current_page, this.search).subscribe((data: any) => {
      if (data.status === 0) {
        this.router.navigate(['/authentication']);
      } else {
        this.loadingData = 0;
        this.hasNext = false;
        this.hasPrevious = false;
        if (data.current_page !== data.last_page)
          this.hasNext = true;
        if (data.current_page !== 1)
          this.hasPrevious = true;
        this.last_page = data.last_page;
        this.pages = [];
        let upper_limit = 10;
        let lower_limit = 1;
        if (this.last_page <= 10) {
          upper_limit = this.last_page;
          lower_limit = 1;
        } else {
          lower_limit = this.current_page;
          upper_limit = lower_limit + 9;
          if (upper_limit > this.last_page) {
              upper_limit = this.last_page;
              lower_limit = upper_limit - 9;
          }
        }

        for (let i = lower_limit; i <= upper_limit; i++) {
          this.pages.push(i);
        }
        this.source.load(data.data);
      }

    });
  }
  pageChanged(newpage) {
    this.current_page = newpage;
    this.fetchData();
  }

  previous() {
    if (this.hasPrevious) {
      this.current_page--;
      this.fetchData();
    }
  }

  next() {
    if (this.hasNext) {
      this.current_page++;
      this.fetchData();
    }
  }

  onDeleteConfirm(event): void {
    // tslint:disable-next-line:max-line-length
    if (window.confirm('Are you sure you want to delete this customer? Once deleted this customer and all its loans/maturities will be unavailable in the system.')) {
      event.data.is_deleted = 1;
      this.customerListService.edit(event.data).subscribe((data: any) => {
        if (data.status === 0) {
          this.toastr.error( 'Your session has expired, please login again.', 'Session Timed Out !!!', {
            timeOut: 4000,
            closeButton: true,
          });
          event.data.is_deleted = 0;
          event.confirm.reject();
          this.router.navigate(['/authentication']);

        } else if (data.status === 2) {
          event.data.is_deleted = 0;
          this.toastr.error( data.msg, 'Error !!!', {
            timeOut: 4000,
            closeButton: true,
          });
          event.confirm.reject();
        } else {
          this.toastr.success( 'Customer deleted successfully.', 'Success !!!', {
            timeOut: 4000,
            closeButton: true,
          });
          event.confirm.resolve();
          this.current_page = 1;
          this.fetchData();
        }
      });

    } else {
      event.confirm.reject();
    }
  }
}




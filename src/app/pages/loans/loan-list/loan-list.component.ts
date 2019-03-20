import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LoanListService } from './loan-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLoanModalComponent } from './modal/add.loan.modal.component';
import {Router} from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';
import { LoanEditComponent} from './LoanEditComponent';
import {EditLoanModalComponent} from './modal/edit.loan.modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-loan-list',
  templateUrl: './loan-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class LoanListComponent {

  hasPrevious: boolean= false;
  hasNext: boolean= false;
  last_page= 1;
  current_page= 1;
  pages: any[];
  loadingData = 0;
  customer_id = '0';
  customer_name = '';
  loan_cycle:any;
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
        renderComponent: LoanEditComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe(row => {
           this.showEditLoanModal(row);
          });
        },
        defaultValue: '',
        filter: false,
        sort: false,
        editor: {
          type: 'custom',
          component: LoanEditComponent,
        },
      },
      loan_start_date: {
        title: 'Loan Start Date',
        type: 'string',
        filter: false,
      },
      loan_amt: {
        title: 'Loan Amount',
        type: 'string',
        filter: false,
      },
      no_of_installments: {
        title: 'No. of installments',
        type: 'string',
        filter: false,
      },
      loan_percentage: {
        title: 'Loan Percentage',
        type: 'string',
        filter: false,
      },
      with_sc: {
        title: 'With S/C',
        type: 'number',
      },
      loan_cycle: {
        title: 'Loan Cycle',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private loanListService: LoanListService,
    private modalService: NgbModal,
    private router: Router,
    private toastrService: NbToastrService,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
    this.customer_id = this.route.snapshot.paramMap.get('id');
    this.customer_name = this.route.snapshot.paramMap.get('name');
    this.fetchData();
    this.fetchMaxCycle();
  }
  fetchMaxCycle(){
    this.loadingData = 1;
    this.loanListService.fetchMaxCycle(this.customer_id).subscribe((data: any) => {
      if (data && data.status === 0) {
        this.router.navigate(['/authentication']);
      } else {
        this.loadingData = 0;
        this.loan_cycle = data?data:0;
      }

    });
  }
  showAddLoanModal() {

    const activeModal = this.modalService.open(AddLoanModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Loan';
    console.log(this.customer_id);
    activeModal.componentInstance.customerId = this.customer_id;
    activeModal.componentInstance.loan_cycle = this.loan_cycle+1;
    
    activeModal.result.then((result) => {
      if (result === 'Loan Created') {
        this.loanCreated();
      }
    });


  }
  showEditLoanModal(row) {

    const activeModal = this.modalService.open(EditLoanModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Edit Loan';
    activeModal.componentInstance.rowData = row;
    activeModal.result.then((result) => {
      if (result === 'Loan Edited') {
        this.loanEdited();
      }
    });


  }
  loanCreated() {
    this.current_page = 1;
    this.fetchData();
  }


  loanEdited() {
    this.fetchData();
  }

  fetchData() {
    this.loadingData = 1;
    this.loanListService.list(this.current_page, this.customer_id).subscribe((data: any) => {
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
    if (window.confirm('Are you sure you want to delete this loan?')) {
      event.data.is_deleted = 1;
      this.loanListService.edit(event.data).subscribe((data: any) => {
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
          this.toastr.success( 'Loan deleted successfully.', 'Success !!!', {
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




import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BranchListService } from './branch-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBranchModalComponent } from './modal/add.branch.modal.component';
import {Router} from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';
import { BranchEditComponent} from './BranchEditComponent';
import {EditBranchModalComponent} from './modal/edit.branch.modal.component';
@Component({
  selector: 'ngx-branch-list',
  templateUrl: './branch-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class BranchListComponent {

  hasPrevious: boolean= false;
  hasNext: boolean= false;
  last_page= 1;
  current_page= 1;
  pages: any[];
  loadingData = 0;
  search= {
    branch_name: '',
    address: '',
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
        renderComponent: BranchEditComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe(row => {
           this.showEditBranchModal(row);
          });
        },
        defaultValue: '',
        filter: false,
        sort: false,
        editor: {
          type: 'custom',
          component: BranchEditComponent,
        },
      },
      branch_name: {
        title: 'Branch Name',
        type: 'string',
        filter: false,
      },
      address: {
        title: 'Address',
        type: 'string',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private branchListService: BranchListService,
    private modalService: NgbModal,
    private router: Router,
    private toastrService: NbToastrService,
    private toastr: ToastrService) {
    this.fetchData();
  }

  showAddBranchModal() {

    const activeModal = this.modalService.open(AddBranchModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Branch';
    activeModal.result.then((result) => {
      if (result === 'Branch Created') {
        this.branchCreated();
      }
    });


  }
  showEditBranchModal(row) {

    const activeModal = this.modalService.open(EditBranchModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Edit Branch';
    activeModal.componentInstance.rowData = row;
    activeModal.result.then((result) => {
      if (result === 'Branch Edited') {
        this.branchEdited();
      }
    });


  }
  branchCreated() {
    this.current_page = 1;
    this.fetchData();
  }
  searchBranch() {
    this.current_page = 1;
    this.fetchData();
  }
  clearSearch() {
    this.search = {
      branch_name: '',
      address: '',
    };
    this.current_page = 1;
    this.fetchData();
  }

  branchEdited() {
    this.fetchData();
  }

  fetchData() {
    this.loadingData = 1;
    this.branchListService.list(this.current_page, this.search).subscribe((data: any) => {
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
    if (window.confirm('Are you sure you want to delete this branch? Once deleted this branch and all its customers will be unavailable in the system.')) {
      event.data.is_deleted = 1;
      this.branchListService.edit(event.data).subscribe((data: any) => {
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
          this.toastr.success( 'Branch deleted successfully.', 'Success !!!', {
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




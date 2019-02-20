import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BranchListService } from './branch-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBranchModalComponent } from './modal/add.branch.modal.component';
import {Router} from '@angular/router';

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
    private router: Router) {
    this.fetchData();
  }
  showAddBranchModal() {

    let activeModal = this.modalService.open(AddBranchModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Branch';
    activeModal.result.then((result) => {
      if (result === 'Branch Created') {
        this.branchCreated();
      }
    });


  }
  branchCreated() {
    this.current_page = 1;
    this.fetchData();
  }

  fetchData() {
    this.loadingData = 1;
    this.branchListService.list(this.current_page).subscribe((data: any) => {
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
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}




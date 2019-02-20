import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterConfig } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';
import { BranchListService } from '../branch-list.service';

@Component({
  selector: 'ngx-add-branch-modal',
  templateUrl: './add.branch.modal.component.html',
  styleUrls: ['../../../bootstrap/form-inputs/form-inputs.component.scss'],
})

export class AddBranchModalComponent {

  modalHeader: string;
  invalidBranchName = false;
  invalidBranchAddress = false;
  branchName: string = '';
  branchAddress: string = '';
  saving= false;
  @Output() branchCreated = new EventEmitter<any>();

  constructor(private activeModal: NgbActiveModal,
    private toastrService: NbToastrService,
    private toastr: ToastrService,
    private branchlistservice: BranchListService,
    private router: Router) { }


  createBranch() {
    const branchNameRegexp = /^[0-9a-zA-Z ]+$/;
    if (this.branchName.trim() === '') {
      this.invalidBranchName = true;
      this.toastr.error('Please enter branch name.', 'Branch Name Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.branchName.match(branchNameRegexp)) {
      this.invalidBranchName = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid branch name, Your branch name can contain characters, numbers and space only',
       'Branch Name is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidBranchName = false;
    }
    if (this.branchAddress.trim() === '') {
      this.invalidBranchAddress = true;
      this.toastr.error('Please enter branch address.', 'Branch Address Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidBranchAddress = false;
    }

    if (!this.invalidBranchName && !this.invalidBranchAddress) {
      this.saving = true;
      this.branchlistservice.add({branch_name: this.branchName,
        address: this.branchAddress}).subscribe((data: any) => {
          this.saving = false;

          if (data.status === 0) {
            this.router.navigate(['/authentication']);
            this.closeModal('');
          } else {
            this.branchCreated.emit(data);
            this.closeModal('Branch Created');
          }

        });

    }

  }

  closeModal(data) {
    this.activeModal.close(data);
  }
}

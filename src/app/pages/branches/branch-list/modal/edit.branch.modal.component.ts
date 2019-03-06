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
  selector: 'ngx-edit-branch-modal',
  templateUrl: './edit.branch.modal.component.html',
  styleUrls: ['../../../bootstrap/form-inputs/form-inputs.component.scss'],
})

export class EditBranchModalComponent {

  modalHeader: string;
  invalidBranchName = false;
  invalidBranchAddress = false;
  rowData: any;
  saving= false;
  @Output() branchEdited = new EventEmitter<any>();

  constructor(private activeModal: NgbActiveModal,
    private toastrService: NbToastrService,
    private toastr: ToastrService,
    private branchlistservice: BranchListService,
    private router: Router) { }


  editBranch() {
    const branchNameRegexp = /^[0-9a-zA-Z ]+$/;
    if (this.rowData.branch_name.trim() === '') {
      this.invalidBranchName = true;
      this.toastr.error('Please enter branch name.', 'Branch Name Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.rowData.branch_name.match(branchNameRegexp)) {
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
    if (this.rowData.address.trim() === '') {
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
      this.branchlistservice.edit(this.rowData).subscribe((data: any) => {
          this.saving = false;

          if (data.status === 0) {
            this.router.navigate(['/authentication']);
            this.closeModal('');
          } else if (data.status === 2) {
            this.toastr.error(data.msg, 'Error!!!', {
              timeOut: 4000,
              closeButton: true,
            });
          }else {
            this.branchEdited.emit(data);

            this.toastr.success('Branch successfully updated', 'Success!!!', {
              timeOut: 4000,
              closeButton: true,
            });
            this.closeModal('Branch Edited');
          }

        });

    }

  }

  closeModal(data) {
    this.activeModal.close(data);
  }
}

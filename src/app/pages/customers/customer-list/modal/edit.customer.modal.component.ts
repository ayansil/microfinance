import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterConfig } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';
import { CustomerListService } from '../customer-list.service';
import { BranchListService } from '../../../branches/branch-list/branch-list.service';

@Component({
  selector: 'ngx-edit-customer-modal',
  templateUrl: './edit.customer.modal.component.html',
  styleUrls: ['../../../bootstrap/form-inputs/form-inputs.component.scss'],
})

export class EditCustomerModalComponent implements OnInit {

  modalHeader: string;

  invalidCustomerFirstName = false;
  invalidCustomerLastName = false;
  invalidCustomerAddress = false;
  invalidCustomerPhone = false;
  invalidCustomerNomineeFirstName = false;
  invalidCustomerNomineeLastName = false;
  invalidCustomerNomineeRelation = false;
  invalidCustomerBranch = false;

  rowData: any;
  branches=[];
  saving= false;
  @Output() customerEdited = new EventEmitter<any>();

  constructor(private activeModal: NgbActiveModal,
    private toastrService: NbToastrService,
    private toastr: ToastrService,
    private customerlistservice: CustomerListService,
    private branchListService: BranchListService,
    private router: Router) { }

  ngOnInit(){
    this.branchListService.getAllBranches().subscribe((data:any)=>{
      this.branches = data;
    });
  }
  editCustomer() {
    const customerNameRegexp = /^[a-zA-Z]+$/;
    if (this.rowData.first_name.trim() === '') {
      this.invalidCustomerFirstName = true;
      this.toastr.error('Please enter first name.', 'First Name Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.rowData.first_name.match(customerNameRegexp)) {
      this.invalidCustomerFirstName = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid first name, Customer first name can contain characters only',
       'First Name is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidCustomerFirstName = false;
    }

    if (this.rowData.last_name.trim() === '') {
      this.invalidCustomerLastName = true;
      this.toastr.error('Please enter last name.', 'Last Name Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.rowData.last_name.match(customerNameRegexp)) {
      this.invalidCustomerLastName = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid last name, Customer last name can contain characters only',
       'Last Name is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidCustomerLastName = false;
    }
    if (this.rowData.address.trim() === '') {
      this.invalidCustomerAddress = true;
      this.toastr.error('Please enter customer address.', 'Customer Address Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidCustomerAddress = false;
    }
    const customerPhoneRegexp = /^[0-9]+$/;
    if (this.rowData.phone.trim() === '') {
      this.invalidCustomerPhone = true;
      this.toastr.error('Please enter phone no.', 'Custome Phone Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.rowData.phone.match(customerPhoneRegexp)) {
      this.invalidCustomerPhone = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid phone no., Customer phone can contain numbers only',
       'Phone no. is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidCustomerPhone = false;
    }

    if (this.rowData.nominee_first_name.trim() !== '' && !this.rowData.nominee_first_name.match(customerNameRegexp)) {
      this.invalidCustomerNomineeFirstName = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid nominee first name, nominee first name can contain characters only',
       'Nominee First Name is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidCustomerNomineeFirstName = false;
    }

    if (this.rowData.nominee_last_name.trim() !== '' && !this.rowData.nominee_last_name.match(customerNameRegexp)) {
      this.invalidCustomerNomineeLastName = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid nominee last name, Nominee last name can contain characters only',
       'Nominee Last Name is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidCustomerNomineeLastName = false;
    }


    if (this.rowData.nominee_relation.trim() !== '' && !this.rowData.nominee_relation.match(customerNameRegexp)) {
      this.invalidCustomerNomineeRelation = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid nominee relation, Nominee relation can contain characters only',
       'Nominee Relation is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidCustomerNomineeRelation = false;
    }

    if (this.rowData.branch_id === ''){
      this.invalidCustomerBranch = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please select a branch',
       'Branch selection is manadatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidCustomerBranch = false;
    }

    // tslint:disable-next-line:max-line-length
    if (!this.invalidCustomerAddress && !this.invalidCustomerFirstName && !this.invalidCustomerBranch && !this.invalidCustomerLastName && !this.invalidCustomerNomineeFirstName && !this.invalidCustomerPhone && !this.invalidCustomerNomineeLastName && !this.invalidCustomerNomineeRelation) {
      this.saving = true;
      this.customerlistservice.edit(this.rowData).subscribe((data: any) => {
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
            this.customerEdited.emit(data);

            this.toastr.success('Customer successfully updated', 'Success!!!', {
              timeOut: 4000,
              closeButton: true,
            });
            this.closeModal('Customer Edited');
          }

        });

    }

  }

  closeModal(data) {
    this.activeModal.close(data);
  }
}

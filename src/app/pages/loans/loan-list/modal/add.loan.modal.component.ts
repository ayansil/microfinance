import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterConfig } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';
import { LoanListService } from '../loan-list.service';

@Component({
  selector: 'ngx-add-loan-modal',
  templateUrl: './add.loan.modal.component.html',
  styleUrls: ['../../../bootstrap/form-inputs/form-inputs.component.scss'],
})

export class AddLoanModalComponent {

  modalHeader: string;
  invalidLoanAmount = false;
  invalidNumberOfInstallments = false;
  invalidLoanStartDate = false;
  invalidLoanPercentage = false;
  invalidWithSC = false;
  invalidLoanCycle = false;

  loan_amt = '';
  no_of_installments = '';
  loan_start_date = '';
  loan_percentage = '';
  with_sc = '';
  loan_cycle = '';

  saving= false;

  @Output() loanCreated = new EventEmitter<any>();

  constructor(private activeModal: NgbActiveModal,
    private toastrService: NbToastrService,
    private toastr: ToastrService,
    private loanlistservice: LoanListService,
    private router: Router) { }


  createLoan() {
    const loanAmtRegexp = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!this.loan_amt) {
      this.invalidLoanAmount = true;
      this.toastr.error('Please enter some nonzero value in loan amount.', 'Loan Amount Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.loan_amt.match(loanAmtRegexp)) {
      this.invalidLoanAmount = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid loan amount',
       'Loan Amount is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidLoanAmount = false;
    }
    const no_of_installments_regexp = /^\d+$/;
    if (!this.no_of_installments) {
      this.invalidNumberOfInstallments = true;
      this.toastr.error('Please enter no. of installments', 'No. Of Installments Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.no_of_installments.match(no_of_installments_regexp)) {
      this.invalidNumberOfInstallments = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid number of installments',
       'Number Of Installments Is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidNumberOfInstallments = false;
    }
    const loan_start_date_regexp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    if (!this.loan_start_date) {
      this.invalidLoanStartDate = true;
      this.toastr.error('Please enter loan start date', 'Loan Start Date Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.loan_start_date.match(loan_start_date_regexp)) {
      this.invalidLoanStartDate = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid loan start date of yyyy-mm-dd format',
       'Loan Start Date Is invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidLoanStartDate = false;
    }
    const loanPercentageRegexp = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!this.loan_percentage) {
      this.invalidLoanPercentage = true;
      this.toastr.error('Please enter some nonzero value in loan percentage.', 'Loan Percentage Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.loan_percentage.match(loanPercentageRegexp)) {
      this.invalidLoanPercentage = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid loan percentage',
       'Loan Percentage Is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidLoanPercentage = false;
    }
    const with_sc_Regexp = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!this.with_sc) {
      this.invalidWithSC = true;
      this.toastr.error('Please enter some nonzero value in with sc.', 'With SC Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.with_sc.match(with_sc_Regexp)) {
      this.invalidWithSC = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid with sc',
       'With SC Is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidWithSC = false;
    }
    const loan_cycle_regexp = /^\d+$/;
    if (!this.loan_cycle) {
      this.invalidLoanCycle = true;
      this.toastr.error('Please enter loan cycle', 'Loan Cycle Is Mandatory!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else if (!this.loan_cycle.match(loan_cycle_regexp)) {
      this.invalidLoanCycle = true;
      // tslint:disable-next-line:max-line-length
      this.toastr.error( 'Please enter a valid loan cycle',
       'Loan Cycle Is Invalid!!!', {
        timeOut: 4000,
        closeButton: true,
      });
    } else {
      this.invalidLoanCycle = false;
    }

    // tslint:disable-next-line:max-line-length
    if (!this.invalidLoanAmount && !this.invalidNumberOfInstallments && this.invalidLoanStartDate && !this.invalidLoanPercentage && !this.invalidWithSC && !this.invalidLoanCycle) {
      this.saving = true;
      this.loanlistservice.add({
        loan_amt: this.loan_amt,
        no_of_installments: this.no_of_installments,
        loan_start_date: this.loan_start_date,
        loan_percentage: this.loan_percentage,
        with_sc: this.with_sc,
        loan_cycle: this.loan_cycle,
      }).subscribe((data: any) => {
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
            this.loanCreated.emit(data);

            this.toastr.success('Loan successfully created', 'Success!!!', {
              timeOut: 4000,
              closeButton: true,
            });
            this.closeModal('Loan Created');
          }

        });

    }

  }

  closeModal(data) {
    this.activeModal.close(data);
  }
}

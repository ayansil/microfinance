import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterConfig } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';
import { LoanListService } from '../loan-list.service';
import { SettingsService } from '../../../settings/settings.service';

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
  customerId;

  loan_amt = '0';
  no_of_installments = '';
  loan_start_date = '';
  loan_percentage = '';
  with_sc = '0';
  loan_cycle: any;

  saving= false;

  @Output() loanCreated = new EventEmitter<any>();

  loadingData = 0;
  constructor(private activeModal: NgbActiveModal,
    private toastrService: NbToastrService,
    private toastr: ToastrService,
    private loanlistservice: LoanListService,
    private router: Router,
    private settingsService: SettingsService) {
      this.fetchSettings();
    }
    

    fetchSettings() {
      this.loadingData = 1;
      this.settingsService.getSettings('loan_interest,loan_installments_no').subscribe((data: any) => {
        if (data.status === 0) {
          this.router.navigate(['/authentication']);
        } else {
          this.loadingData = 0;
          this.loan_percentage=data[0].value;
          this.no_of_installments= data[1].value;
          const today = new Date();
          let dd = String(today.getDate());
          let mm = String(today.getMonth() + 1);
          if ( parseInt(dd, 10) < 10 )
            dd = '0' + dd;
          if ( parseInt(mm, 10) < 10 )
            mm = '0' + mm;
          const yyyy = today.getFullYear();
          this.loan_start_date = yyyy + '-'  + mm + '-' + dd;
        }

      });
    }

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
    if (!this.loan_start_date) {
      this.invalidLoanStartDate = true;
      this.toastr.error('Please enter loan start date', 'Loan Start Date Is Mandatory!!!', {
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
    

    // tslint:disable-next-line:max-line-length
    if (!this.invalidLoanAmount && !this.invalidNumberOfInstallments && !this.invalidLoanPercentage) {
      this.saving = true;
      let with_sc = this.loan_amt*1+this.loan_amt*this.loan_percentage/100;
      this.loanlistservice.add({
        loan_amt: this.loan_amt,
        no_of_installments: this.no_of_installments,
        loan_start_date: this.loan_start_date,
        loan_percentage: this.loan_percentage,
        with_sc: with_sc,
        loan_cycle: this.loan_cycle,
        customer_id:this.customerId,
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

import { Injectable } from '@angular/core';
import { LoanTableData } from '../data/loan-table';

@Injectable()
export class LoanTableService extends LoanTableData {

  data = [{
    id: 1,
    loan_date: '2018-12-03',
    loan_amt: 10000,
    interest_rate: 16,
    with_sc: 11600,
    loan_cycle: 1,
    ins_no: 290,
    ins_amt: 40
  },{
    id: 2,
    loan_date: '2018-04-12',
    loan_amt: 10000,
    interest_rate: 16,
    with_sc: 11600,
    loan_cycle: 1,
    ins_no: 290,
    ins_amt: 40
  },{
    id: 1,
    loan_date: '2017-10-03',
    loan_amt: 10000,
    interest_rate: 16,
    with_sc: 11600,
    loan_cycle: 1,
    ins_no: 290,
    ins_amt: 40
  },{
    id: 1,
    loan_date: '2016-12-03',
    loan_amt: 10000,
    interest_rate: 16,
    with_sc: 11600,
    loan_cycle: 1,
    ins_no: 290,
    ins_amt: 40
  },
   
];

  getData() {
    return this.data;
  }
}

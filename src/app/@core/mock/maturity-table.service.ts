import { Injectable } from '@angular/core';
import { MaturityTableData } from '../data/maturity-table';

@Injectable()
export class MaturityTableService extends MaturityTableData {

  data = [{
    id: 1,
    amount: 10000,
    loan_amt: 11600,
    days: 1,
    balance: 290,
    
  },{
    id: 2,
    amount: 10000,
    loan_amt: 11600,
    days: 1,
    balance: 290,
  },{
    id: 3,
    amount: 10000,
    loan_amt: 11600,
    days: 1,
    balance: 290,
  },{
    id: 4,
    amount: 10000,
    loan_amt: 11600,
    days: 1,
    balance: 290,
  },
   
];

  getData() {
    return this.data;
  }
}

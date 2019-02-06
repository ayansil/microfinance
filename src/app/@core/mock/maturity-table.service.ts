import { Injectable } from '@angular/core';
import { MaturityTableData } from '../data/maturity-table';

@Injectable()
export class MaturityTableService extends MaturityTableData {

  data = [{
    id: 1,
    amount: 10,
    date: "2017-09-10",
    maturity_amt: 5000,
    days: 450,
    day: 413,
    balance: 4130,
    status: 'Running'
  },
  {
    id: 2,
    amount: 10,
    date: "2016-09-10",
    maturity_amt: 5000,
    days: 450,
    day: 413,
    balance: 4130,
    status: 'Completed'  
  }
   
];

  getData() {
    return this.data;
  }
}

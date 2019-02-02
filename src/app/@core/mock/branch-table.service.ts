import { Injectable } from '@angular/core';
import { BranchTableData } from '../data/branch-table';

@Injectable()
export class BranchTableService extends BranchTableData {

  data = [{
    id: 1,
    branchName:'Branch ABC',
    address: "56, XYZ LANE, PQRS, PIN - 11111"
  },{
    id: 2,
    branchName:'Branch DEF',
    address: "3-A, Poui Lane, abcd, Pin - 22222"
  },{
    id: 3,
    branchName:'Branch XYZ',
    address: "6/a, BL-67, typo street, PQRS, PIN-33333"
  },
];

  getData() {
    return this.data;
  }
}

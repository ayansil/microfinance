import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  template: `{{rowData.branch.branch_name}}`,
})
export class CustomerBranchEditComponent {


  @Input() value;
  @Input() rowData;
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {  }




}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  template: `
    <i class='fa fa-edit' style='cursor:pointer;' (click)='openeditmodal()'></i>
  `,
})
export class CustomerEditComponent {


  @Input() value;
  @Input() rowData;
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {  }

  openeditmodal() {
    this.save.emit(this.rowData);
  }


}

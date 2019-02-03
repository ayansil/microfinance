import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
    <button class="btn btn-success btn-round btn-xs" style="cursor:pointer;" (click)="viewLoans()">Loans</button>aaaaaaaaaaaaa
  `,
})
export class LoansRenderComponent implements OnInit {

  public renderValue;

  @Input() value;
  @Input() rowData;

  constructor() {  }

  ngOnInit() {
    this.renderValue = this.value;
  }

  viewLoans() {
    alert(this.rowData.id+'fffffffffffffff');
  }


}
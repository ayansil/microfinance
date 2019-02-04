import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import {Router} from "@angular/router"

@Component({
  template: `
    <button class="btn btn-success btn-round btn-xs" style="cursor:pointer;" (click)="viewMaturity()">Maturity</button>
  `,
})
export class MaturityRenderComponent implements OnInit {

  public renderValue;

  @Input() value;
  @Input() rowData;

  constructor(private router: Router) {  }

  ngOnInit() {
    this.renderValue = this.value;
  }

  viewMaturity() {

    this.router.navigate(['/customers']);
  }


}
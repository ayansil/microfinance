import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BranchListService } from './branch-list.service';

@Component({
  selector: 'branch-list',
  templateUrl: './branch-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class BranchListComponent {

  hasPrevious:boolean=false;
  hasNext:boolean=false;
  last_page=1;

settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      branch_name: {
        title: 'Branch Name',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private branchListService:BranchListService) {
    this.branchListService.list(1).subscribe((data:any) => {
      if(data.current_page!=data.last_page)
        this.hasNext=true;
      if(data.current_page!=1)
        this.hasPrevious=true;
      this.last_page=data.last_page;
      this.source.load(data.data);

    });

    
  } 

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}




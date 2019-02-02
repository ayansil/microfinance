import { Injectable } from '@angular/core';
import { CustomerTableData } from '../data/customer-table';

@Injectable()
export class CustomerTableService extends CustomerTableData {

  data = [{
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    address: '23, kkd chatterjee road, Pin - 715639',
    phone: 22233123,
    nominee_firstname: 'Barun',
    nominee_lastname: 'Dhawan',
    relation_with_nominee: 'father'

  },
  {
    id: 2,
    firstName: 'xyz',
    lastName: 'pqr',
    address: '29, uuiu sadjask sadda, Pin - 22229',
    phone: 77326423,
    nominee_firstname: 'apple',
    nominee_lastname: 'sat',
    relation_with_nominee: 'mother'

  },
  {
    id: 3,
    firstName: 'hjjhja',
    lastName: 'iiuqw',
    address: '67, iuiu uyuy iuioasd, Pin - 990969',
    phone: 99992929,
    nominee_firstname: '',
    nominee_lastname: '',
    relation_with_nominee: ''

  },
  {
    id: 4,
    firstName: 'iusjjs',
    lastName: 'uiuuoa',
    address: '11, iuiusad ajsdhasj akk, Pin - 898916',
    phone: 78898089,
    nominee_firstname: 'kjjk',
    nominee_lastname: 'jhha',
    relation_with_nominee: 'husband'

  },
  {
    id: 5,
    firstName: 'apple',
    lastName: 'pie',
    address: '11, usdiad asskdjsad as, Pin - 72839',
    phone: 88889900,
    nominee_firstname: 'iuiu',
    nominee_lastname: 'asdad',
    relation_with_nominee: 'spouse'

  }, 
];

  getData() {
    return this.data;
  }
}

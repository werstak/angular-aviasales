import { Component, OnInit } from '@angular/core';
import { CheckboxFilterInterface } from '../../interfaces/checkbox-filter.interface';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit {

  filters: CheckboxFilterInterface[] = [
    {name: 'all', title: 'Все'},
    {name: 'without-transfers', title: 'Без пересадок'},
    {name: 'one-transfers', title: '1 пересадка'},
    {name: 'two-transfers', title: '2 пересадки'},
    {name: 'trre-transfers', title: '3 пересадки'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

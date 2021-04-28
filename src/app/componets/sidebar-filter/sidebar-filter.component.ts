import { Component, OnInit } from '@angular/core';
import { CheckboxFilterInterface } from '../../interfaces/checkbox-filter.interface';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit {

  // filters: CheckboxFilterInterface[] = [
  //   {name: 'all', title: 'Все'},
  //   {name: 'without-transfers', title: 'Без пересадок'},
  //   {name: 'one-transfers', title: '1 пересадка'},
  //   {name: 'two-transfers', title: '2 пересадки'},
  //   {name: 'trre-transfers', title: '3 пересадки'},
  // ];

  constructor() { }

  ngOnInit(): void {
  }
}





/*import { Component, OnInit } from '@angular/core';
import { CheckboxFilterInterface } from '../../interfaces/checkbox-filter.interface';


export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})


export class SidebarFilterComponent implements OnInit {

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    subtasks: [
      {name: 'Primary', completed: false},
      {name: 'Accent', completed: false},
      {name: 'Warn', completed: false}
    ]
  };

  allComplete = false;

  updateAllComplete(): void  {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean): void  {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }


  constructor() { }

  ngOnInit(): void {
  }
}*/



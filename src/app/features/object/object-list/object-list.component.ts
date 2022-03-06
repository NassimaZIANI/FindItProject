import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss'],
})
export class ObjectListComponent implements OnInit {
  public listObj: any = [
    { id: 1, name: 'obj1' },
    { id: 2, name: 'obj2' },
    { id: 3, name: 'obj3' },
  ];

  constructor() {}

  ngOnInit(): void {}
}

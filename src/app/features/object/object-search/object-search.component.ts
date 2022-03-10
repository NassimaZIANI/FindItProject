import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-search',
  templateUrl: './object-search.component.html',
  styleUrls: ['./object-search.component.scss'],
})
export class ObjectSearchComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;

  constructor() {}

  ngOnInit(): void {}
}

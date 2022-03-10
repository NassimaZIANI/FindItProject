import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { ObjectService } from './shared/services/object/object.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FindIT';

  constructor(private objService: ObjectService) {}

  ngOnInit() {}
}

import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FindIT';
  public showHead: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/signup') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}

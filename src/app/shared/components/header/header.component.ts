import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public loggedIn: boolean = false;
  public user: User;
  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.loggedIn = true;
        this.authService.getUser(user.uid).then((user) => (this.user = user));
      } else {
        this.loggedIn = false;
      }
    });
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}

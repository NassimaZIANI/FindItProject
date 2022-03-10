import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          JSON.parse(localStorage.getItem('user')!);
          return true;
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);

          this.router.navigate(['account', 'login']);
          return false;
        }
      })
    );
  }
}

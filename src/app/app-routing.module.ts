import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './features/account/forgot-password/forgot-password.component';
import { LoginComponent } from './features/account/login/login.component';
import { ObjectAddComponent } from './features/object/object-add/object-add.component';
import { ObjectDetailComponent } from './features/object/object-detail/object-detail.component';
import { ObjectListComponent } from './features/object/object-list/object-list.component';
import { ObjectSearchComponent } from './features/object/object-search/object-search.component';
import { SignupComponent } from './features/account/signup/signup.component';
import { VerifyEmailComponent } from './features/account/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
    ],
  },
  {
    path: 'objects',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ObjectListComponent },
      { path: 'add', component: ObjectAddComponent },
      /* { path: ':id', component: ObjectDetailComponent }, */
      { path: ':id/search', component: ObjectSearchComponent },
    ],
  },
  { path: '', redirectTo: 'objects', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailValidationComponent } from './pages/email-validation/email-validation.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '', component: EmailValidationComponent,
    children: [
      { path: 'email', component: EmailValidationComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

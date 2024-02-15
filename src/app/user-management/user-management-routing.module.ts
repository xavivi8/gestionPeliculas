import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListUserPageComponent } from './pages/list-user-page/list-user-page.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'list', component: ListUserPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }

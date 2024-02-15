import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { ListUserPageComponent } from './pages/list-user-page/list-user-page.component';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ListUserPageComponent,
    AddUserPageComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule
  ]
})
export class UserManagementModule { }

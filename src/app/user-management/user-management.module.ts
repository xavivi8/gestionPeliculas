import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { ListUserPageComponent } from './pages/list-user-page/list-user-page.component';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './components/delete-usuario/delete-usuario.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ListUserPageComponent,
    AddUserPageComponent,
    EditUsuarioComponent,
    DeleteUsuarioComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule,
    MatPaginatorModule
  ]
})
export class UserManagementModule { }

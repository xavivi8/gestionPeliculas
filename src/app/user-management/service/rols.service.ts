import { Injectable } from '@angular/core';
import { Rol } from '../interfaces/rol.interface';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/auth/interfaces/usuario.interfaces';
import { URL_API } from 'src/environments/environments';

const ENDPOINT = 'rol';

@Injectable({ providedIn: 'root' })
export class RolsService {
  roles: Rol[] | null = null;

  constructor(
    private http: HttpClient,
    private commonService: SharedService
  ) { }

  getAllRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headersSge });
  }

  addRol(rol: Rol) {
    const body = JSON.stringify(rol);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headersSge });
  }

  editRol(rol: Rol) {
    const body = JSON.stringify(rol);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headersSge });
  }

  deleteRol(idRol: string | number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${idRol}`, { headers: this.commonService.headersSge });
  }

  removeRol(idRol?: number) {
    if (this.roles !== null) {
      this.roles = this.roles.filter(rol => {
        return Number(rol.id_rol) !== Number(idRol);
      });
    } else {
      return;
    }

  }

  updateRol(rol: Rol) {
    let index = null;
    if (this.roles !== null) {
      this.roles.filter((rolFilter, indexFilter) => {
        if (rol.id_rol === rolFilter.id_rol) {
          index = indexFilter;
        }
      });

      if (index) {
        this.roles[index] = rol;
      }
    } else {
      return;
    }

  }

}

import { Injectable } from '@angular/core';
import { Rol } from '../interfaces/rol.interface';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Observable } from 'rxjs';
import { URL_API } from 'src/environments/environments';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

const ENDPOINT = 'rol';

@Injectable({ providedIn: 'root' })
export class RolsService {
  roles: Rol[] | null = null;

  constructor(
    private http: HttpClient,
    private commonService: SharedService
  ) { }

  /**
   * Obtiene todos los roles desde la API.
   * @returns {Observable<ApiResponse>} Un observable de ApiResponse.
   */
  getAllRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headersSge });
  }

  /**
   * Agrega un nuevo rol a la API.
   * @param {Rol} rol El rol a agregar.
   * @returns {Observable<ApiResponse>} Un observable de ApiResponse.
   */
  addRol(rol: Rol) {
    const body = JSON.stringify(rol);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headersSge });
  }

  /**
   * Edita un rol existente en la API.
   * @param {Rol} rol El rol a editar.
   * @returns {Observable<ApiResponse>} Un observable de ApiResponse.
   */
  editRol(rol: Rol) {
    const body = JSON.stringify(rol);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headersSge });
  }

  /**
   * Elimina un rol de la API.
   * @param {string} idRol El ID del rol a eliminar.
   * @returns {Observable<ApiResponse>} Un observable de ApiResponse.
   */
  deleteRol(idRol: string | number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${idRol}`, { headers: this.commonService.headersSge });
  }

  /**
   * Elimina un rol del array local de roles.
   * @param {number} idRol El ID del rol a eliminar.
   */
  removeRol(idRol?: number) {
    if (this.roles !== null) {
      this.roles = this.roles.filter(rol => {
        return Number(rol.id_rol) !== Number(idRol);
      });
    } else {
      return;
    }

  }

  /**
   * Actualiza un rol en el array local de roles.
   * @param {Rol} rol El rol a actualizar.
   */
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

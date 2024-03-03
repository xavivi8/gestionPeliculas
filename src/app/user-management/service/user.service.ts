import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { URL_API } from 'src/environments/environments';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

const ENDPOINT = 'usuario';

@Injectable({ providedIn: 'root' })
export class UserService {
  usuarios: Usuario[] = [];

  constructor(
    private http: HttpClient,
    private commonService: SharedService
  ) { }

  /**
   * Obtiene todos los usuarios desde la API.
   * @returns {Observable<ApiResponse>} Un observable de ApiResponse.
   */
  getAllUsuarios() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headersSge });
  }

  /**
   * Agrega un nuevo usuario a la API.
   * @param {Usuario} usuario El usuario a agregar.
   * @returns {Observable<ApiResponse>} Un observable de ApiResponse.
   */
  addUsuario(usuario: Usuario) {
    const body = JSON.stringify(usuario);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headersSge });
  }

  /**
   * Edita un usuario existente en la API.
   * @param {Usuario} usuario El usuario a editar.
   * @param {string} route La ruta opcional para la solicitud.
   * @returns {Observable<ApiResponse>} Un observable de ApiResponse.
   */
  editUsuario(usuario: Usuario, route?: string) {
    const body = JSON.stringify(usuario);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headersSge });
  }

  /**
   * Elimina un usuario de la API.
   * @param {Usuario} usuario El usuario a eliminar.
   * @returns {Observable<ApiResponse>} Un observable de ApiResponse.
   */
  deleteUsuario(usuario: Usuario) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${usuario.id_usuario}`, { headers: this.commonService.headersSge });
  }

  /**
   * Elimina un usuario del array local de usuarios.
   * @param {number} idUser El ID del usuario a eliminar.
   */
  removeUsuario(idUser: number) {
    if (this.usuarios !== null) {
      this.usuarios = this.usuarios.filter(usuario => {
        return Number(usuario.id_usuario) !== Number(idUser);
      });
    } else {
      return;
    }

  }

  /**
   * Actualiza un usuario en el array local de usuarios.
   * @param {Usuario} usuario El usuario a actualizar.
   */
  updateUsuario(usuario: Usuario) {
    let index = null;
    if (this.usuarios !== null) {
      this.usuarios.filter((usuarioFilter, indexFilter) => {
        if (usuario.id_usuario === usuarioFilter.id_usuario) {
          index = indexFilter;
        }
      });

      if (index) {
        this.usuarios[index] = usuario;
      }
    } else {
      return;
    }

  }
}

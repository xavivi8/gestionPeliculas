import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ApiResponse } from 'src/app/auth/interfaces/usuario.interfaces';
import { URL_API } from 'src/environments/environments';

const ENDPOINT = 'usuario';

@Injectable({ providedIn: 'root' })
export class UserService {
  usuarios: Usuario[] | null = null;

  constructor(
    private http: HttpClient,
    private commonService: SharedService
  ) { }

  getAllUsuarios() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headersSge });
  }

  addUsuario(usuario: Usuario) {
    const body = JSON.stringify(usuario);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headersSge });
  }

  editUsuario(usuario: Usuario, route?: string) {
    const body = JSON.stringify(usuario);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headersSge });
  }

  deleteUsuario(usuario: Usuario) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${usuario.id_usuario}`, { headers: this.commonService.headersSge });
  }

  removeUsuario(idUser: number) {
    if (this.usuarios !== null) {
      this.usuarios = this.usuarios.filter(usuario => {
        return Number(usuario.id_usuario) !== Number(idUser);
      });
    } else {
      return;
    }

  }

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

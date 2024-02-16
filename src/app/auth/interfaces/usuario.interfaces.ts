export interface ApiResponse {
  ok: boolean;
  message?: string;
  data?: any;
  permises?: Permises;
}

export interface Permises {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export interface User{
  id_usuario: string;
  usuario: string;
  id_rol: string;
  log: string;
  contrasena:string;
  nombre_publico:string;
  email: string;
  token_sesion: string | null;
}

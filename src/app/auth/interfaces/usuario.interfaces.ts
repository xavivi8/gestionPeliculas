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

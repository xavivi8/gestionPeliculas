export interface ResultadoPeliFav{
  data: PeliFav[],
  message: string,
  ok: boolean,
  permises: string
}

export interface PeliFav{
  id_pelicula_fav: number;
  usuario: string;
  identificador: number;
}

export interface Concierto{
  id:string;
  concierto: string;
  valorBoleta: number;
  valorTotal: number;
  fecha: Date;
}

export interface Usuario{
  id:string;
  nombre:string;
  apellido:string;
  correo:string;
  pass: string;
  image: string;
}
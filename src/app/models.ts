export interface Concierto{
  id:string;
  concierto: string;
  valorBoleta: number;
  valorTotal: number;
  fecha: Date;
  hay:number;
  faltante:number;
  ganancias:number;
}

export interface Usuario{
  id:string;
  nombre:string;
  apellido:string;
  correo:string;
  pass: string;
  image: string;
}

export interface Participante{
  id:string;
  nombre:string;
  apellido:string;
}
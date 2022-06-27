import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(public database: AngularFirestore) { }

  CrearDocumento(data: any, enlace: string, id: string){
    const ref = this.database.collection(enlace);
    return ref.doc(id).set(data);
  }

  ListarDocumento<tipo>(enlace: string){
    const ref = this.database.collection<tipo>(enlace);
    return ref.valueChanges();
  }

  EliminarDocumento(enlace: string, id:string){
    const ref = this.database.collection(enlace);
    return ref.doc(id).delete();
  }

  ObtenerDocumento<tipo>(enlace: string, id:string){
    const ref = this.database.collection<tipo>(enlace);
    return ref.doc(id).valueChanges();
  }

  EditarDocumento(data: any, enlace: string, id: string){
    const ref = this.database.collection(enlace);
    return ref.doc(id).update(data);
  }

  ObtenerId(){
   return this.database.createId();
  }

  async ListarSubColecciones<tipo>(usuarioId:string){
    const respuesta = this.database.collection<tipo>(`Usuarios/${usuarioId}/Conciertos`);
    return respuesta.valueChanges();
  }

  async ListarSubColeccionesLevel2<tipo>(usuarioId:string, conciertoId:string){
    const respuesta = this.database.collection<tipo>(`Usuarios/${usuarioId}/Conciertos/${conciertoId}/Participantes`);
    return respuesta.valueChanges();
  }

  async ObtenerSubColeccion<tipo>(usuarioId:string, docId:string){
    const respuesta = this.database.collection<tipo>(`Usuarios/${usuarioId}/Conciertos`);
    return respuesta.doc(docId).valueChanges();
  }
}

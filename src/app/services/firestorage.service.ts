import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public fireStorage: AngularFireStorage) { }

  CargarImagen(file:any, path:string, nombre:string): Promise<string>{
    return new Promise( resolve => {
      const ruta = path + '/' + nombre;
      const ref = this.fireStorage.ref(ruta);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const descargarUrl = res;
            resolve(descargarUrl);
            return;
          }); 
        }) 
     )
    .subscribe();
    });
  }
}

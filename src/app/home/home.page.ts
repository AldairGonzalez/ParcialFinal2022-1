import { Component } from '@angular/core';
import { Concierto } from '../models';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestoreService } from '../services/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  conciertos: Concierto[] = [];
  respuesta:any;
  constructor(public database: FirestoreService, public auth: FirebaseauthService, public sub: AngularFirestore) {
    this.auth.estadoAutenticacion().subscribe(res => {
      if (res !== null){
        this.ListarConciertos(res.uid);
        
      }
    });
  }

  ngOnInit() {
  }

  ListarConciertos(usuarioId:string){
    this.database.ListarSubColecciones<Concierto>(usuarioId).then(res => {
      const subscribe = res.subscribe(collection => {
        this.conciertos = collection;
        console.log(this.conciertos);
      });
    });
  }
}

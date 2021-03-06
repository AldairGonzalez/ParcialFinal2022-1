import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Concierto } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ver-concierto',
  templateUrl: './ver-concierto.page.html',
  styleUrls: ['./ver-concierto.page.scss'],
})
export class VerConciertoPage implements OnInit {
  concierto: Concierto={
    id: '',
    concierto: '',
    valorBoleta: undefined,
    valorTotal: undefined,
    fecha: undefined,
    hay:undefined,
    faltante:undefined,
    ganancias:undefined
  };
  id: string;
  usuarioId: string;
  constructor(public database: FirestoreService, public activate: ActivatedRoute, public router:Router, public alert:AlertController, public auth:FirebaseauthService) {
    this.id =  this.activate.snapshot.params['conciertoId'];
    this.auth.estadoAutenticacion().subscribe(res => {
      if (res !== null){
        this.ObtenerConcierto(res.uid);
        this.usuarioId = res.uid;
      }
    });
   }
  ngOnInit() {
  }

  ObtenerConcierto(usuarioId:string){
  this.database.ObtenerSubColeccion<Concierto>(usuarioId, this.id).then(res => {
    const respuesta = res.subscribe(doc => {
      this.concierto = doc;
    });
  });
  }

  eliminarConcierto(){
    this.alertaEliminacion();
  }

  async alertaEliminacion(){
    const url = "Usuarios/" + this.usuarioId + "/Conciertos";
    const alertaCreacionMensaje = await this.alert.create({
        header: "Confirmar Petición",
        message: "¿Está seguro de querer eliminar este concierto?",
        buttons:[
          {
            text:"Cancelar",
            cssClass:"primary",
            role:"cancel"
          },
          {
          text: "Aceptar",
          cssClass: "primary",
          handler: (blah) => {
            this.database.EliminarDocumento(url, this.concierto.id);
            this.router.navigate(["/home"]);

          }
        }]
    });
    alertaCreacionMensaje.backdropDismiss = false;
    await alertaCreacionMensaje.present();
  }

}

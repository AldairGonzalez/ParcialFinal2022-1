import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Concierto } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-crear-concierto',
  templateUrl: './crear-concierto.page.html',
  styleUrls: ['./crear-concierto.page.scss'],
})
export class CrearConciertoPage implements OnInit {
  conciertoNuevo: Concierto = {
    id: this.database.ObtenerId(),
    concierto: '',
    valorBoleta: null,
    valorTotal: null,
    fecha: new Date(),
    hay: 0,
    faltante:0,
    ganancias:0
  };

  private usuarioId:string = '';

  constructor(public database: FirestoreService, public auth:FirebaseauthService, public alert: AlertController, public router:Router) {
    this.auth.estadoAutenticacion().subscribe(res => {
      if (res !== null){
        this.usuarioId = res.uid;
      }
    });
   }

  ngOnInit() {
  }

 async alertaCreacion(){
    const alertaCreacionMensaje = await this.alert.create({
        header: "¡Buenas Noticias!",
        message: "Se ha creado el concierto satisfactoriamente",
        buttons:[{
          text: "Aceptar",
          cssClass: "primary",
          handler: (blah) => {
            this.router.navigate(["/home"]);
          }
        }]
    });
    alertaCreacionMensaje.backdropDismiss = false;
    await alertaCreacionMensaje.present();
  }

 async crearConcierto(){
    const url = "Usuarios/"+ this.usuarioId + "/Conciertos";
    this.conciertoNuevo.faltante = this.conciertoNuevo.valorTotal;
    this.database.CrearDocumento(this.conciertoNuevo,url, this.conciertoNuevo.id)
    this.alertaCreacion();
  }
}

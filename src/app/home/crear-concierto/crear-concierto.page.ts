import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Concierto } from 'src/app/models';
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
    fecha: null,
  };
  private enlace = "Conciertos/";

  constructor(public database: FirestoreService, public alert: AlertController, public router:Router) { }

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

  crearConcierto(){
    this.database.CrearDocumento(this.conciertoNuevo,this.enlace,this.conciertoNuevo.id);
    this.alertaCreacion();
  }
}

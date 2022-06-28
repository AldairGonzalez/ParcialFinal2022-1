import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Concierto } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-editar-concierto',
  templateUrl: './editar-concierto.page.html',
  styleUrls: ['./editar-concierto.page.scss'],
})
export class EditarConciertoPage implements OnInit {
  concierto: Concierto={
    id: '',
    concierto: '',
    valorBoleta: 0,
    valorTotal: 0,
    fecha: undefined,
    hay:0,
    faltante:0,
    ganancias:0
  };
  id: string;
  public usuarioId:string;
  constructor(public database: FirestoreService, public activate: ActivatedRoute, public alert: AlertController, public loadingController: LoadingController, public router:Router, public auth:FirebaseauthService) {
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

    editarConcierto(){
      const url = "Usuarios/" + this.usuarioId + "/Conciertos"; 
      this.presentLoading()
      this.database.EditarDocumento(this.concierto,url, this.concierto.id);
      this.alertaConfirmacion()
    }

    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando...',
        duration: 900
      });
      await loading.present();
      await loading.onDidDismiss();
    }

    async alertaConfirmacion(){
      const alertaCreacionMensaje = await this.alert.create({
          header: "¡Buenas Noticias!",
          message: "Se ha actualizado el concierto satisfactoriamente",
          buttons:[{
            text: "Aceptar",
            cssClass: "primary",
            handler: (blah) => {
              this.router.navigate(["/home/ver-concierto", this.concierto.id]);
            }
          }]
      });
      alertaCreacionMensaje.backdropDismiss = false;
      await alertaCreacionMensaje.present();
    }
}

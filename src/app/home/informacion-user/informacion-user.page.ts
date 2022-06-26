import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-informacion-user',
  templateUrl: './informacion-user.page.html',
  styleUrls: ['./informacion-user.page.scss'],
})
export class InformacionUserPage implements OnInit {
  usuario:Usuario = {
    id:'',
    nombre:'',
    apellido:'',
    correo:'',
    pass: '',
    image:''
  };
  private enlace = "Usuarios/";
  constructor(public auth:FirebaseauthService, public router: Router,public alert: AlertController, public database: FirestoreService) {
      this.auth.estadoAutenticacion().subscribe(res => {
        if (res !== null){
          this.usuario.id = res.uid;
          this.obtenerUserInfo(this.usuario.id);
        }
      });
   }

  ngOnInit() {
  }

 async obtenerUserInfo(id:string){
   await this.database.ObtenerDocumento<Usuario>(this.enlace, id).subscribe(res => {
        this.usuario = res;
    });
  }

  logout(){
    this.alertaCreacion();
  }

  async alertaCreacion(){
    const alertaCreacionMensaje = await this.alert.create({
        header: "Mensaje De Confirmación",
        message: "¿Está seguro de querer cerrar sesión?",
        buttons:[
          {
            text: "Cancelar",
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
          text: "Aceptar",
          handler: (blah) => {
            this.auth.logout();
            this.router.navigate(["/login"]);
          }
        }]
    });
    alertaCreacionMensaje.backdropDismiss = false;
    await alertaCreacionMensaje.present();
  }
}

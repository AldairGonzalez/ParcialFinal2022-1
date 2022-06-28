import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.page.html',
  styleUrls: ['./registar.page.scss'],
})
export class RegistarPage implements OnInit {
  usuario:Usuario = {
    id:'',
    nombre:'',
    apellido:'',
    correo:'',
    pass: '',
    image:''
  };
  loading:any;
  private enlace = "Usuarios/";

  constructor(public database: FirestoreService, public alert: AlertController, public router:Router, public fireStorage: FirestorageService, public loadingController: LoadingController, public auth: FirebaseauthService) { }

  ngOnInit() {
  }

  async registrar(){
    this.presentLoading();
    await this.auth.registrar(this.usuario.correo, this.usuario.pass);
    const idUser = await this.auth.obtenerId();
    this.usuario.id = idUser;
    this.database.CrearDocumento(this.usuario,this.enlace, this.usuario.id);
    this.auth.logout();
    this.alertaCreacion();
  }

  async NuevaImagen(file:any){
    this.presentLoading();
    const enlace = "UsuariosImagen";
    const nombre = this.usuario.nombre;
    const archivo  = file.target.files[0];
    const res = await this.fireStorage.CargarImagen(archivo,enlace,nombre);
    this.usuario.image = res;
  }

  async alertaCreacion(){
    const alertaCreacionMensaje = await this.alert.create({
        header: "¡Buenas Noticias!",
        message: "Se ha creado el usuario satisfactoriamente",
        buttons:[{
          text: "Aceptar",
          cssClass: "primary",
          handler: (blah) => {
            this.router.navigate(["/login"]);
          }
        }]
    });
    alertaCreacionMensaje.backdropDismiss = false;
    await alertaCreacionMensaje.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 1500
    });
    await this.loading.present();
    await this.loading.onDidDismiss();
  }

}

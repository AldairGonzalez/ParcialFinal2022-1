import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.page.html',
  styleUrls: ['./editar-user.page.scss'],
})
export class EditarUserPage implements OnInit {

  usuario:Usuario = {
    id:'',
    nombre:'',
    apellido:'',
    correo:'',
    pass:'',
    image:''
  };

  private usuarioPass = '';
  private enlace = "Usuarios/";
  constructor(public activate: ActivatedRoute, public database: FirestoreService, public auth:FirebaseauthService, public alert: AlertController, public fireStorage: FirestorageService, public loadingController: LoadingController, public router:Router) { 
    this.auth.estadoAutenticacion().subscribe(res => {
      if (res !== null){
        this.usuario.id = res.uid;
        this.obtenerUserInfo(this.usuario.id);
      }
    });
  }

  ngOnInit() {
  }

  obtenerUserInfo(id:string){
    this.database.ObtenerDocumento<Usuario>(this.enlace, id).subscribe(res => {
        this.usuario = res;
        this.usuarioPass = res.pass;
    });
  }

  async editaUsuario(){
    this.presentLoading();
    await this.auth.actualizarUsuario(this.usuario.correo, this.usuario.pass).then(res => {
      if(res === true){
        this.database.EditarDocumento(this.usuario, this.enlace, this.usuario.id).then(resp => {
          this.alertaConfirmacion();
        });
      }
    });
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
        header: 'Confirmar Datos',
        message: 'Por favor, ingrese la contraseña',
        inputs: [
          {
            name: 'password',
            placeholder: 'Password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: data => {
              if (data.password === this.usuarioPass) {
                this.editaUsuario();
                return true;
              } else {
                // invalid login
                return false;
              }
            }
          }
        ]
      });
      alertaCreacionMensaje.backdropDismiss = false;
      await alertaCreacionMensaje.present();
    }

    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando...',
        duration: 1500
      });
      await loading.present();
      await loading.onDidDismiss();
    }

    async alertaConfirmacion(){
      const alertaCreacionMensaje = await this.alert.create({
          header: "¡Buenas Noticias!",
          message: "Se ha actualizado el usuario satisfactoriamente",
          buttons:[{
            text: "Aceptar",
            cssClass: "primary",
            handler: (blah) => {
              this.router.navigate(["/home/informacion-user"]);
            }
          }]
      });
      alertaCreacionMensaje.backdropDismiss = false;
      await alertaCreacionMensaje.present();
    }
  }

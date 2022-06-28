import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms'
import { Console } from 'console';

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
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  loading:any;
  private enlace = "Usuarios/";
  public FormularioRegistro = new FormGroup({
    inputNombre: new FormControl('',[Validators.required]),
    inputApellido: new FormControl('',[Validators.required]),
    inputCorreo: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
    inputPass: new FormControl('',[Validators.required, Validators.minLength(6)])
  });
  constructor(public database: FirestoreService, public alert: AlertController, public router:Router, public fireStorage: FirestorageService, public loadingController: LoadingController, public auth: FirebaseauthService) { }

  ngOnInit() {
  }

  async registrar(){
    if (this.FormularioRegistro.valid)
    {
      this.presentLoading();
    
      await this.auth.registrar(this.usuario.correo, this.usuario.pass).then(res => {
        console.log(res);
        this.cargarUsuarioDataBase();
      }).catch(error => {
        this.alertaCorreoExistente();
      });
    }
  }

  async cargarUsuarioDataBase(){
    const idUser = await this.auth.obtenerId();
    this.usuario.id = idUser;
    console.log(this.usuario);
    console.log(this.enlace);
    console.log(this.usuario.id);
    this.database.CrearDocumento(this.usuario,this.enlace, this.usuario.id).then(resp => {
      console.log(resp);
      this.auth.logout();
      this.alertaCreacion();
    }).catch(error => {
      console.log(error);
      
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
        header: "¡Buenas Noticias!",
        message: "Se ha creado el usuario satisfactoriamente",
        buttons:[{
          text: "Aceptar",
          cssClass: "primary",
          handler: (blah) => {
            this.FormularioRegistro.reset();
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
      duration: 900
    });
    await this.loading.present();
    await this.loading.onDidDismiss();
  }

  async alertaCorreoExistente(){
    const alertaCreacionMensaje = await this.alert.create({
        header: "Error",
        message: "El Email ingresado ya se encuentra registrado en nuestro sistema",
        buttons:[{
          text: "Aceptar",
          cssClass: "primary",
          role:"Cancel"
        }]
    });
    alertaCreacionMensaje.backdropDismiss = false;
    await alertaCreacionMensaje.present();
  }

  get Nombre(){return this.FormularioRegistro.get('inputNombre');}
  get Apellido(){return this.FormularioRegistro.get('inputApellido');}
  get Correo(){return this.FormularioRegistro.get('inputCorreo');}
  get Contrasena(){return this.FormularioRegistro.get('inputPass');}

}

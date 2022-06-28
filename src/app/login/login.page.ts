import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:Usuario= {
    id:'',
    nombre:'',
    apellido:'',
    correo:'',
    pass: '',
    image:''
  }
  constructor(public auth:FirebaseauthService, public router:Router, public alert: AlertController) { }

  ngOnInit() {
    this.auth.logout();
  }

  ingresar(){
    this.auth.login(this.user.correo,this.user.pass).then(res => {
      this.navegar();
    }).catch(error => {
      this.alertaCreacion();
    });
  }

  async alertaCreacion(){
    const alertaCreacionMensaje = await this.alert.create({
        header: "¡Error De Autenticación!",
        message: "Esta cuenta no se encuentra registrada en nuestro sistema",
        buttons:[{
          text: "Aceptar",
          cssClass: "primary"
        }]
    });
    alertaCreacionMensaje.backdropDismiss = false;
    await alertaCreacionMensaje.present();
  }

  async navegar(){
    this.auth.estadoAutenticacion().subscribe(res => {
      if(res.uid !== null){
        this.router.navigate(["/home"]);
      }
    });
  }

}

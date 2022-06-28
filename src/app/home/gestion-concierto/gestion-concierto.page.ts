import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Console } from 'console';
import { Concierto, Participante } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-gestion-concierto',
  templateUrl: './gestion-concierto.page.html',
  styleUrls: ['./gestion-concierto.page.scss'],
})
export class GestionConciertoPage implements OnInit {
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
  participantes:Participante[];

  participante: Participante={
    id:'',
    nombre:'',
    apellido:''
  };

  public id = '';
  public usuarioId = ';'
  constructor(public auth:FirebaseauthService,  public activate: ActivatedRoute, public database:FirestoreService, public alert:AlertController) {
    this.id =  this.activate.snapshot.params['conciertoId'];
    this.auth.estadoAutenticacion().subscribe(res => {
      if (res !== null){
        this.ObtenerConcierto(res.uid);
        this.usuarioId = res.uid;
        this.listarParticipantes(res.uid);
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
  
   async registrar(){
    const url = "Usuarios/" + this.usuarioId + "/Conciertos/" + this.concierto.id + "/Participantes";
    this.participante.id = this.database.ObtenerId();
    this.database.CrearDocumento(this.participante,url, this.participante.id);
    this.descontar();
    }

    async descontar(){
      const valorTotal = this.concierto.valorTotal * 1;
      const valorBoleta = this.concierto.valorBoleta * 1;
      this.concierto.hay += valorBoleta;
      if ((valorTotal - this.concierto.hay) >= 0){
        this.concierto.faltante = valorTotal - this.concierto.hay;
      }else{
        this.concierto.ganancias = (valorTotal - this.concierto.hay) * (-1);
        this.concierto.faltante = 0;
      }
      const enlace = "Usuarios/" + this.usuarioId + "/Conciertos";
      this.database.EditarDocumento(this.concierto, enlace, this.concierto.id);
    }

    async listarParticipantes(usuarioId:string){
      this.database.ListarSubColeccionesLevel2<Participante>(usuarioId,this.id).then(res => {
        const subscribe = res.subscribe(collection => {
          this.participantes = collection;
        });
      });
    }

}

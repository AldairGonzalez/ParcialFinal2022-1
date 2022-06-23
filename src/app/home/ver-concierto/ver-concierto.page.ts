import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Concierto } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ver-concierto',
  templateUrl: './ver-concierto.page.html',
  styleUrls: ['./ver-concierto.page.scss'],
})
export class VerConciertoPage implements OnInit {
  concierto: Concierto;
  id: string;
  private enlace = "Conciertos/";
  constructor(public database: FirestoreService, public activate: ActivatedRoute) { }
  ngOnInit() {
    this.id = this.activate.snapshot.paramMap.get('conciertoId');
    this.ObtenerConcierto();
  }

  ObtenerConcierto(){
  this.database.ObtenerDocumento<Concierto>(this.enlace, this.id).subscribe(res => {
    this.concierto = res;
   });
  }

}

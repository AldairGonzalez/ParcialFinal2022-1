import { Component } from '@angular/core';
import { Concierto } from '../models';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  conciertos: Concierto[] = [];
  private enlace = "Conciertos/";
  constructor(public database: FirestoreService) {}

  ngOnInit() {
    this.ListarConciertos();
  }

  ListarConciertos(){
    this.database.ListarDocumento<Concierto>(this.enlace).subscribe(res => {
    this.conciertos = res;
    });
  }
}

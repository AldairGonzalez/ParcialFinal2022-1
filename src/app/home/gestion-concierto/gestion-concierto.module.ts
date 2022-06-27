import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionConciertoPageRoutingModule } from './gestion-concierto-routing.module';

import { GestionConciertoPage } from './gestion-concierto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionConciertoPageRoutingModule
  ],
  declarations: [GestionConciertoPage]
})
export class GestionConciertoPageModule {}

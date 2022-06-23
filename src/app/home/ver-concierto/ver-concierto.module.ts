import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerConciertoPageRoutingModule } from './ver-concierto-routing.module';

import { VerConciertoPage } from './ver-concierto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerConciertoPageRoutingModule
  ],
  declarations: [VerConciertoPage]
})
export class VerConciertoPageModule {}

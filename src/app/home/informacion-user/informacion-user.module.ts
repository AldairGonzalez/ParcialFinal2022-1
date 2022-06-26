import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionUserPageRoutingModule } from './informacion-user-routing.module';

import { InformacionUserPage } from './informacion-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionUserPageRoutingModule
  ],
  declarations: [InformacionUserPage]
})
export class InformacionUserPageModule {}

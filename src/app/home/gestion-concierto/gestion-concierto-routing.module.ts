import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionConciertoPage } from './gestion-concierto.page';

const routes: Routes = [
  {
    path: '',
    component: GestionConciertoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionConciertoPageRoutingModule {}

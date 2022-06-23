import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarConciertoPage } from './editar-concierto.page';

const routes: Routes = [
  {
    path: '',
    component: EditarConciertoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarConciertoPageRoutingModule {}

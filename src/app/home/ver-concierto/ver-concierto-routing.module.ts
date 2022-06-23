import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerConciertoPage } from './ver-concierto.page';

const routes: Routes = [
  {
    path: '',
    component: VerConciertoPage
  },
  {
    path: 'editar-concierto/:conciertoId',
    loadChildren: () => import('./editar-concierto/editar-concierto.module').then( m => m.EditarConciertoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerConciertoPageRoutingModule {}

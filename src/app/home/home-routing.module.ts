import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'crear-concierto',
    loadChildren: () => import('./crear-concierto/crear-concierto.module').then( m => m.CrearConciertoPageModule)
  },
  {
    path: 'ver-concierto/:conciertoId',
    loadChildren: () => import('./ver-concierto/ver-concierto.module').then( m => m.VerConciertoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

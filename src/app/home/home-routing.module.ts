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
  },
  {
    path: 'informacion-user',
    loadChildren: () => import('./informacion-user/informacion-user.module').then( m => m.InformacionUserPageModule)
  },
  {
    path: 'editar-user/:usuarioId',
    loadChildren: () => import('./editar-user/editar-user.module').then( m => m.EditarUserPageModule)
  },
  {
    path: 'editar-concierto/:conciertoId',
    loadChildren: () => import('./editar-concierto/editar-concierto.module').then( m => m.EditarConciertoPageModule)
  },
  {
    path: 'gestion-concierto/:conciertoId',
    loadChildren: () => import('./gestion-concierto/gestion-concierto.module').then( m => m.GestionConciertoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

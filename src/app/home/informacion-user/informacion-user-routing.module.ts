import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionUserPage } from './informacion-user.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionUserPageRoutingModule {}

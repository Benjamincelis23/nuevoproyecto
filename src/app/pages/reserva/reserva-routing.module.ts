// reserva-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaPage } from './reserva.page'; // Asegúrate de que la ruta sea correcta

const routes: Routes = [
  {
    path: '',
    component: ReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaPageRoutingModule {}

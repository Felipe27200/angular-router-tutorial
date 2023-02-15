import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';

const routes: Routes = [
  /**
   * Se debe añadir como tercer elemento el objeto data, 
   * para las rutas a las que se aplicaran animaciones.
   */
  {path: "heroes", component: HeroListComponent, data: { animation: 'heroes' }},
  {path: "hero/:id", component: HeroDetailComponent, data: { animation: 'hero' }},
];

/**
 * +-------------------+
 * | ADDITIONAL ROUTES |
 * +-------------------+
 * 
 * Este módulo son las rutas adicionales
 * para el feature module.
 * 
 * Es mejor que cada feature module tenga
 * su propio archivo de configuración de
 * rutas, para que sea un proyecto más
 * escalable.
 */
@NgModule({
  /**
   * +-------------------+
   * | FORCHILD() METHOD |
   * +-------------------+
   *
   * forChild() se usa en cualquier otro
   * módulo que no sea AppRoutingModule,
   * ya que las rutas de este están a nivel
   * raíz, mientras que la de los demás 
   * módulos no.
   */

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }

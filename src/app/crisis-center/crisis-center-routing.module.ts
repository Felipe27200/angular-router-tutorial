import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';

import { canDeactivateGuard } from '../can-deactivate.guard';
import { crisisDetailResolver } from './crisis-detail-resolver';

const crisisCenterRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    /**
     * +-----------------+
     * | CHILDREN ROUTES |
     * +-----------------+

     * Children route that contain a single
     * route for CrisisListComponent.
     * 
     * Los componentes que se renderizan a través de
     * una children route, se mostraran en el router-outlet
     * del componente con su ruta padre.
     * 
     * En este caso CrisisListComponent se renderiza en 
     * el router-outlet de CrisisCenterComponent quién
     * posee la ruta padre.
     * 
     * Si existe una relación padre-hijo, varios componentes
     * podrían ser mostrados con las misma ruta.
     * 
     * Así los hijos pueden compartir la ruta del padre y ser
     * mostrado junto con este. 
     */
    children: [
      {
        path: '',
        component: CrisisListComponent,
        /**
         * The Children route also contain
         * two children routes.
         * 
         * Estas dos rutas hijas rendizaran sus componentes
         * en el router-outlet de CrisisListComponent.
         */
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            /**
             * Se incluye el canDeactivate a la ruta con
             * el fin, de controlar si el usuario desea o
             * no guardar los datos editados, y poder manejarlo
             * de forma asíncrona.
             */
            canDeactivate: [canDeactivateGuard],
            /**
             * El router llama implícitamente al @resolver en caso
             * de que el usuario pueda navegar fuera, por lo que no
             * es necesario codificarlo de forma explícita.
             */
            resolve: {
              crisis: crisisDetailResolver
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
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
   * 
   * +------------------------------+
   * | DISPLAY CRISIS' CHILD ROUTES |
   * +------------------------------+

   * El router mostrará los componentes de estas 
   * rutas en el RouterOutlet del CrisisCenterComponent,
   * no en el RouterOutlet de AppComponent.
   */

  imports: [RouterModule.forChild(crisisCenterRoutes)],
  exports: [RouterModule]
})
export class CrisesRoutingModule { }

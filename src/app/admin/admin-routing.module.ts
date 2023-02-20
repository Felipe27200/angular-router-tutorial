import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';

import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,

    /**
     * +--------+
     * | GUARDS |
     * +--------+

     * This property enable the protection
     * guard within this routes.
     * 
     * canActivate -> To mediate navigation to a route.
     * 
     * +------------------------------------------+
     * | HOW TO ENABLE OR REDIRECT WITH THE GUARD |
     * +------------------------------------------+
     * 
     * Llama a authGuard, que verifica el valor de isLogged
     * de AuthService, si es true puede continuar con esta 
     * ruta('/admin'), de lo contrario, lo redirecciona a "/login".
     * 
     * Protege desde está ruta hasta las que dependen de ella para
     * poder ser cargardas.
     */
    canActivate: [authGuard],

    children: [
      {
        /**
         * +----------------------+
         * | COMPONENT-LESS ROUTE |
         * +----------------------+
         *
         * Se define una ruta sin componente directo
         * relacionado, ya que se definen los hijos después.
         * 
         * Esto hace más sencillo el guard para las child routes.
         */
        path: '',
        /**
         * +--------------------------+
         * | PROTECT THE CHILD ROUTES |
         * +--------------------------+
         * 
         * Corre antes de que cualquier child route esté activada.
         * 
         * Gracias al component-less, se puede aplicar el guard
         * desde él a todas las children routes, sin necesidad de 
         * declarar el guard en c/u de ellas. 
         */
        canActivateChild: [authGuard],
        children: [
          {path: 'crises', component: ManageCrisesComponent},
          {path: 'heroes', component: ManageHeroesComponent},
          {path: '', component: AdminDashboardComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

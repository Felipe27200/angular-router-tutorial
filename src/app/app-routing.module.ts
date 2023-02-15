import { NgModule } from '@angular/core';

/**
 * Necessary package to get the 
 * routing functionality.
 */
import { RouterModule, Routes } from "@angular/router";

import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * +-----------------------+
 * | Applicaction's ROUTES |
 * +-----------------------+
 * 
 * Definir las rutas de la 
 * aplicación.
 */
const appRoutes: Routes = [
  {path: 'crisis-center', component: CrisisListComponent},

  /**
   * Para todas las rutas vacías redirigir 
   * a la ruta en @redirectTo
   */
  {path: '', redirectTo: "/heroes", pathMatch: 'full'},

  /**
   * +------------------+
   * | MATCH ALL ROUTES |
   * +------------------+
   * 
   * Los doble astericos hacen match con todas las url's,
   * por lo que este componente puede ser cargado con cualquier
   * url. 
   * 
   * Por eso debe ser el último, ya que Angular hace
   * match con la primera ruta que coindida en el array de Routes.
   */
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    /**
     * El método retorna un módulo que contiene
     * el @Router service provider configurado.
     * Permitiendo así la navegación.
     * 
     * Al estar ubicado en imports de AppModule, este
     * array hace disponible el @Router for all app.
     * 
     * Estas rutas están a nivel raíz de la app.
     */
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],

  /**
   * Hace disponible para 
   * otros este módulo.
   */
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

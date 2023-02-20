import { NgModule } from '@angular/core';

/**
 * Necessary package to get the 
 * routing functionality.
 */
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { authGuard } from './auth/auth.guard';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

/**
 * +-----------------------+
 * | Applicaction's ROUTES |
 * +-----------------------+
 * 
 * Definir las rutas de la 
 * aplicación.
 */
const appRoutes: Routes = [
  /**
   * +---------------------+
   * | AIM TO NAMED OUTLET |
   * +---------------------+

   * The third property refers to named outlet,
   * this is the target of the ComposeMessageComponent:
   */
  {path: 'compose', component: ComposeMessageComponent, outlet: 'popup'},
  {
    path: "admin",
    /**
     * +--------------+
     * | LAZY LOADING |
     * +--------------+
     * 
     * Toma una función que retorna una
     * promesa usando la sintaxis incorporada en el
     * navegador para la lazy loading code, utilizando
     * importaciones dinámicas import('...').
     * 
     * El path es la ubicación de AdminModule (relativa a la raíz de la app),
     * 
     * Después el código es solicitado y cargado, Promise lo resuelve en un
     * objeto que contiene el NgModule, en este caso el AdminModule.
     * 
     * +-------+
     * | STEPS |
     * +-------+
     * 
     * 1. Cuando se navega a esta ruta, el router usa el string en loadChildren
     * para cargar dinámicamente el AdminModule.
     * 
     * 2. Luego añade las rutas del AdminModule a la actual configuración de ruta.
     * 
     * 3. Finalmente, carga la ruta solicitada para el componente de destino
     * admin component.
     */ 
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),

    /**
     * Con esto también se proteje las rutas a nivel raíz
     */
    canMatch: [authGuard]
  },
  {
    path: "crisis-center",
    loadChildren: () => import("./crisis-center/crises.module").then(m => m.CrisesModule),

    /**
     * Es la propiedad data de route,
     * se le puede añadir cualquier otra 
     * propiedad a ésta.
     * 
     * Se van a precargar solo las rutas que
     * tengan la propiedad 'preload' en true.
     */
    data: { preload: true }
  },
  /**
   * Para todas las rutas vacías redirigir 
   * a la ruta en @redirectTo
   * 
   * +----------------------+
   * | MANAGE THE REDIRECTS |
   * +----------------------+
   * 
   * Se debe apuntar a la nueva ruta del componente
   * HeroesListComponent, esto por el Router maneja los 
   * redirects una vez por cada nivel del routing configuration.
   * 
   * Esto para prevenir un encadenamiento de redirects.  
   */
  {path: '', redirectTo: "/superheroes", pathMatch: 'full'},

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
     * 
     * El segundo parámetro es un objeto que permite
     * definir características para el router and routing.
     */
    RouterModule.forRoot(appRoutes, { 
      enableTracing: true,
      /**
       * +----------------------------+
       * | PRELOAD LAZY LOADED MODULE |
       * +----------------------------+
       * 
       * Esta propiedad se encarga de precargar
       * cada módulo que haya sido definido con 
       * Lazy Loaded, así el componente ya está
       * listo antes que el usuario active su ruta.
       * 
       *  <--- preloadingStrategy: PreloadAllModules --->
       */
      preloadingStrategy: SelectivePreloadingStrategyService
    }),
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

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Necessary package to get the 
 * routing functionality.
 */
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroListComponent } from './hero-list/hero-list.component';
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
  {path: 'heroes', component: HeroListComponent},

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
  declarations: [
    AppComponent,
    CrisisListComponent,
    HeroListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    /**
     * El método retorna un módulo que contiene
     * el @Router service provider configurado.
     * Permitiendo así la navegación.
     * 
     * Al estar ubicado en imports de AppModule, este
     * array hace disponible el @Router for all app.
     */
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

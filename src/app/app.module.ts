import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Package to integrate animations.
 */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

/**
 * Para hacer uso de las rutas hay
 * que importar app-routing.module.ts
 */
import { AppRoutingModule } from './app-routing.module';

import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * +----------------------------------+
 * | IMPORT THE FEATURE MODULE ROUTES |
 * +----------------------------------+
 * 
 * Import the feature module to 
 * enable its routes in the app.
 */
import { HeroesModule } from './heroes/heroes.module';

/**
 * +------------+
 * | ANIMATIONS |
 * +------------+

* The @RouterOutlet token
 */
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from 'src/animation';
@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent,
    PageNotFoundComponent
  ],
  /**
   * Se importa en este array
   * para hacer uso de él, a través de
   * toda la app.
   * 
   * La importacón de estos paquetes ocurre
   * según el orden en que se han posicionado en
   * el array.
   * 
   * Por ende, las rutas dependerán de ese orden,
   * por eso HeroesModule antecede a AppRoutingModule
   * para que sus rutas hagan match, de lo contrario,
   * puede que no lo hagan por la ruta **.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HeroesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

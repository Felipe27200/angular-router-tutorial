import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Package to integrate animations.
 */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';

/**
 * Para hacer uso de las rutas hay
 * que importar app-routing.module.ts
 */
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HeroesModule } from './heroes/heroes.module';
import { AuthModule } from './auth/auth.module';

/**
 * +------------+
 * | ANIMATIONS |
 * +------------+

* The @RouterOutlet token
 */
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from 'src/animation';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
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
   * 
   * +-------------------------------+
   * | DETACH THE FEATURE AREA ADMIN |
   * +-------------------------------+
   * 
   * Con el Lazy Loading la raíz AppModule,
   * ya no debe hacer referencia o cargar archivos
   * de AdminModule.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HeroesModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }

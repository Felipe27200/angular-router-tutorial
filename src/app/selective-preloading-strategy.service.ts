import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  /**
   * Argumentos -> 
   *   1. La ruta a considerar
   *   2. A loader function that can load the routed module asynchronously
   * 
   * Si se implemetna 'preload' puede retornar un Observable, si la ruta
   * es preload retorna el observable llamando a la función loader, sino
   * es preload, retorna un Observable en nulo.
   * 
   * En este caso, se aplica preload si la ruta tiene la flag data.preload en true.
   * Se evita el loading del Route si tiene canMatch guard, ya que puede ser
   * que el usuario no tenga acceso para ella. 
   * 
   * SelectivePreloadingStrategyService -> guarda registro de la ruta seleccionada en
   * su array público preloadedModules.
   */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.canMatch === undefined && route.data?.['preload'] && route.path != null) 
    {
      // add the route path to the preloaded module array
      this.preloadedModules.push(route.path);

      // log the route path to the console
      console.log('Preloaded: ' + route.path);

      return load();
    } 
    else 
    {
      return of(null);
    }
  }
}
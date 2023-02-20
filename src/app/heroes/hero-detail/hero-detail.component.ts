import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

/**
 * ParamMap is an API, it provides methods to handle
 * parameter access for both route parameters and query parameters.
 */
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

/**
 * Se necesitara más adelante para procesar los 
 * parámetros de ruta Observable.
 */
import { Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  hero$!: Observable<Hero>;

  /**
   * Se debe inyectar los servicios en campos privados en el
   * constructor
   */
  constructor(
    /** 
     * - ActivatedRoute -> Contiene la información de la 
     * ruta para esta intancia de HeroDetailComponent.
     */ 
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) { }

  ngOnInit(): void 
  {
    /**
     * +-------------------------------+
     * | RETRIEVE THE URL's PARAMETERS |
     * +-------------------------------+
     *
     * It uses the ActivateRoute service to retrieve the
     * parameters for the route, pull (sacar) the hero
     * id from the parameters, and retrieve the hero to 
     * display.
     * 
     * When the map changes, @paraMap gets the id parameter
     * from the changed parameters in the URL.
     */
    this.hero$ = this.route.paramMap.pipe(
      /**
       * El operador switchMap hace 2 cosas:
       * 
       * 1. It flattens the Observable<Hero> that HeroService
       * returns and cancels previous pending (pendientes) request.
       * 
       * 2. Si el usuario vuelve a navegar a esta ruta con un nuevo
       * id, mientras HeroService aún está recuperando el viejo id,
       * switchMap descartará la petición anterior y trabajará con
       * la actual.
       */
      switchMap((params: ParamMap) => 
        /**
         * params.get() -> returns the paramater with the name
         * specified in the arguments, if exists returns its value,
         * or null its not exists.
         * 
         * Returns the first element if the parameter is an array.
         */
        this.heroService.getHero(params.get('id')!))
    );
  }

  gotoHeroes(hero: Hero) 
  {
    const heroId = hero ? hero.id : null;

    /**
     * +----------+
     * | NAVIGATE |
     * +----------+

     * Redirection is possible thanks to Router's navigate() 
     * method, which can receive a string or an array
     * representing the route.
     */

    /**
     * Se simula el envío de parámetros opcionales,
     * enlazados en el array como segundo elemento
     * en forma de objeto.
     */
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }
}

import { Component, OnInit, Input } from '@angular/core';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
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
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})

export class CrisisDetailComponent implements OnInit {
  crisis$!: Observable<Crisis>;

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
    private crisisService: CrisisService
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
    this.crisis$ = this.route.paramMap.pipe(
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
        this.crisisService.getHero(params.get('id')!))
    );
  }

  gotoCrises(crisis: Crisis) 
  {
    const crisisId = crisis ? crisis.id : null;

    /**
     * +---------------------+
     * | RELATIVE NAVIGATION |
     * +---------------------+
     * 
     * Se debe brindar @ActivateRoute al router para
     * darle conocimiento de la localización actual.
     * 
     * El segundo argumento es un objeto con la propiedad 
     * @relativeTo que esta definida con @ActivateRoute
     * 
     * Con esto el router puede calcular la URL de destino
     * basado en la ubicacion de la ruta activa.
     * 
     * Aquí se le indica que de un paso atrás en el path,
     * se siguen enviando los parámetros para la ruta.
     */
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], 
      { relativeTo: this.route });
  }

  cancel() {
    this.gotoCrises();
  }
  
  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}

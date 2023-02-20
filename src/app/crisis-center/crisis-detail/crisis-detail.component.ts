import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router';

/**
 * Se necesitara más adelante para procesar los 
 * parámetros de ruta Observable.
 */
import { Observable} from 'rxjs';

import { Crisis } from '../crisis';
import { DialogService } from 'src/app/dialog.service';


@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})

export class CrisisDetailComponent implements OnInit {
  crisis!: Crisis;
  editName = '';

  /**
   * Se debe inyectar los servicios en campos privados en el
   * constructor
   */
  constructor(
    /** 
     * - ActivatedRoute -> Contiene la información de la 
     *   ruta para esta intancia de CrisisDetailComponent.
     */ 
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void 
  {
    /**
     * +------------------------------------------+
     * | RETRIEVE THE DATA FROM THE CURRENT ROUTE |
     * +------------------------------------------+
     * 
     * Este componente ya no debería hacer la busqueda
     * de crisis.
     * 
     * Ahora obtiene el 'crisis' desde la propiedad
     * ActivatedRoute.data.crises.
     */
    this.route.data.subscribe(data => {
      const crisis: Crisis = data['crisis'];

      this.editName = crisis.name;
      this.crisis = crisis;
    });
  }

  gotoCrises() 
  {
    const crisisId = this.crisis ? this.crisis.id : null;

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

  /**
   * Allow to wait the user's answer and mantain or discard
   * the changes made for the users.
   */
  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) 
    {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}

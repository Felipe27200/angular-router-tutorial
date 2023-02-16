import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Importar la interfaz
import { Crisis } from '../crisis'; 
import { CrisisService } from '../crisis.service';

@Component({
  /**
   * El selector no es requerido para el routing,
   * ya que los components se insertan dinámicamente
   * cuando la página es renderizada.
   * 
   * Sin embargo, es útil para poder localizarlos e
   * identificarlos en el árbol de elementos de HTML.
   */
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})

export class CrisisListComponent implements OnInit {
  crises$!: Observable<Crisis[]>;

  selectedId = 0;

  constructor(
    private crisisService: CrisisService,
    private route: ActivatedRoute
  ) { }

  onSelect(crisis: Crisis): void {  }

  ngOnInit(): void 
  {
    /**
     * The property ActivateRoute.paramMap is an Observable
     * map of route parameters.
     * 
     * Emits a new map of values that includes id when the user 
     * navigates to the component.
     * 
     * Lo que se está haciendo en este método es suscribirse
     * a esos valores, establecer selectedId y obtener los
     * heróes.
     */
    this.crises$ = this.route.paramMap.pipe(
      switchMap(params => {
        /**
         * El segundo argumento de parseInt() es la base
         * númerica a la que se pasara la conversión.
         */
        this.selectedId = parseInt(params.get("id")!, 10);

        return this.crisisService.getCrises();
      })
    );
  }
}
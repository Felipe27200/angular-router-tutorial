import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Importar la interfaz
import { Hero } from '../hero'; 
import { HeroService } from '../hero.service';

@Component({
  /**
   * El selector no es requerido para el routing,
   * ya que los components se insertan dinámicamente
   * cuando la página es renderizada.
   * 
   * Sin embargo, es útil para poder localizarlos e
   * identificarlos en el árbol de elementos de HTML.
   */
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})

export class HeroListComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  selectedId = 0;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  onSelect(hero: Hero): void
  {
    // this.selectedHero = hero;
  }

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
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        /**
         * El segundo argumento de parseInt() es la base
         * númerica a la que se pasara la conversión.
         */
        this.selectedId = parseInt(params.get("id")!, 10);

        return this.heroService.getHeroes();
      })
    );
  }
}
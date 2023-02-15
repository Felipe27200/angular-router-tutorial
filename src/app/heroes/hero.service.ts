import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>
  {
    const heroes = of(HEROES);

    this.messageService.add("Hero Service: fetched heroes");

    return heroes;
  }

  getHero(id: number | string): Observable<Hero>
  {
    /**
     * Exclamation mark makes that variables
     * never have a null or undefined value.
     * 
     * Is known as NON-NULL ASSERTION OPERATOR.
     * 
     * This is necessary because TypeScript doesn't
     * accept possible variables with null o undefined
     * value.
     * 
     * El + antesd de id, hace la conversión de String a int.
     */
    const hero = HEROES.find(h => h.id === +id)!;
    
    this.messageService.add(`HeroService: fetched hero id = ${id}`);

    return of(hero);
  }
}

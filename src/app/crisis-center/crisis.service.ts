import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';

import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})

export class CrisisService {

  constructor(private messageService: MessageService) { }

  getCrises(): Observable<Crisis[]>
  {
    const crises = of(CRISES);

    this.messageService.add("Crisis Service: fetched crises");

    return crises;
  }

  getHero(id: number | string): Observable<Crisis>
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
    const crisis = CRISES.find(c => c.id === +id)!;
    
    this.messageService.add(`crisisService: fetched crisis id = ${id}`);

    return of(crisis);
  }
}

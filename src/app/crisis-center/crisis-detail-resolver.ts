import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, Router} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {Crisis} from './crisis';
import {CrisisService} from './crisis.service';


/**
 * Let fetch data before the route is activated, 
 * thus doesn't display a blank component while
 * waiting for the data.
 */
export const crisisDetailResolver: ResolveFn<Crisis> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const cs = inject(CrisisService);
  const id = route.paramMap.get('id')!;

  return cs.getCrisis(id).pipe(mergeMap(crisis => {
    if (crisis) 
    {
      return of(crisis);
    } 
    else // id not found 
    {  
      /**
       * Si ningun Crisis es encontrado, entonces, 
       * se redirecciona a CrisisListComponent, se
       * retorna un Observable vacío y se cancela 
       * navegacipon in-progress para CrisisDetailComponent.
       */
      router.navigate(['/crisis-center']);

      /**
       * Retornar un Observable vacío cancela la navegación.
       */
      return EMPTY;
    }
  }));
};
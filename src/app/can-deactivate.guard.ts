import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate 
{
  /**
   * Es tipo -> función sin parámetros que debe retornar un valor
   *  de tipo definido después de "=>"
   */
  canDeactivate?: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**
 * Es de tipo CanDeactivateFn y tiene la Type Assertion con
 * CanComponentDeactivate, que define el tipo específico del campo,
 * luego está inicializado con una función flecha, para corresponder
 * en forma al valor definido por la interfaz CanComponentDeactivate. 
 */
export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> =
    (component: CanComponentDeactivate) => component.canDeactivate ? component.canDeactivate() : true;
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implementation that doesn't use window.confirm
 */
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns observable resolving to `true`=confirm or `false`=cancel.
   * 
   * The observable returns when the users resolve his decision.
   */
  confirm(message?: string): Observable<boolean> {

    /**
     * window.confirm() es una acción de bloqueo que muestra
     * un modal dialog que espera por la interacción del user.
     * 
     * Retorna un observable que se resuelve cuando el usuario 
     * decide que hacer: 
     *    1. Descartar los cambios y navegar fuera (true)
     *    2. Preservar los cambios y mantenerse en el crisis editor (false)
     */
    const confirmation = window.confirm(message || 'Is it OK?');

    return of(confirmation);
  }
}
import {inject} from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import {AuthService} from './auth.service';

/**
 * This Functions expression control the access for
 * the routes through the admin feature area.
 * 
 * Retorna de forma sincrona un boolean o un @UrlTree
 * 
 * Si retorna TRUE la navegación continúa sin problema,
 * de lo contrario, es llevado a login page.
 * 
 * Retornar un @Urltree le dice al router que cancele
 * la navegación actual y programe una nueva para
 * redirigir al usuario.
 */
export const authGuard = () => {
  /**
   * inject() -> función para inyectar dependencias,
   * pero solo es funcional en test environment.
   */
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  /**
   * Es un valor de muestra que permanecera 
   * después de navegar a otra ruta.
   */
  const sessionId = 123456789;

  // Set our navigation extras object
  // that contains our global query params and fragment
  /**
   * Set the query parameters in the URL.
   */
  const navigationExtras: NavigationExtras = {
    queryParams: { session_id: sessionId },
    fragment: 'anchor'
  };

  // Redirect to the login page
  return router.createUrlTree(['/login'], navigationExtras);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent {
  details = '';
  message = '';
  sending = false;

  constructor(private router: Router) { }

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    /**
     * +----------------------+
     * | CLEAR A NAMED OUTLET |
     * +----------------------+
     * 
     * Cada secondary outlet tiene su propia navegación,
     * independiente del manejador de navegación del primary outlet.
     * 
     * Cambiar la ruta actual que se muestra en el primary outlet no
     * tendrá efecto in the popup outlet.
     */

    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet

    /**
     * Se crea otro Link Parameters Array que apunta al outlet 'popup',
     * se le establece "null" que no es una ruta, pero es un valor
     * válido y se encarga de remover de secondary popup route de la
     * URL actual.
     */
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}
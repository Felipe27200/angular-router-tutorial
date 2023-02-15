import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from 'src/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /**
   * +---------------------------+
   * | AVAILABLE THE ANITMATIONS |
   * +---------------------------+

   * Para usar las animaciones en la app
   * se debe añadir este array, en este
   * componente
   */
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'angular-router-tutorial';

  constructor (private contexts: ChildrenOutletContexts) {}

  getAnimationData() 
  {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <gst-busy>Some Loader</gst-busy>
    <div class="modal-outer-template-div"></div>
    <nav>
      <a [routerLink]=" ['./home'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">Home</a>
      <a [routerLink]=" ['./lazy-town'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">Lazy Module</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}

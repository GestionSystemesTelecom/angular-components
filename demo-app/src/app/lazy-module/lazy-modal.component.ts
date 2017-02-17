import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <gst-modal id="edit-user" i18n-title [title]="'Édition utilisateur'">
        <h1>Lazy Modal Component</h1>
        <button (click)="activeModal.close()">Close</button>
    </gst-modal>
  `
})
export class LazyModalComponent {

  constructor(
    public activeModal: NgbActiveModal) { }

}

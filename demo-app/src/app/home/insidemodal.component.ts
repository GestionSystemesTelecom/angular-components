import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <gst-modal id="AnExpliciteId" [Titre]="modalTitle">
      <h1>A component inside a Modal</h1>
      <button (click)="activeModal.close()">Close</button>
    </gst-modal>
  `
})
export class InsideModalComponent {

  public modalTitle: string = 'Default Title';

  constructor(public activeModal: NgbActiveModal) {

  }
}
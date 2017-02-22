import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <gst-modal id="AnExpliciteId" [title]="modalTitle">
      <h1>A component inside a Modal</h1>
      <button (click)="activeModal.close('Action closed modal')">Close</button>
    </gst-modal>
  `
})
export class InsideModalComponent {

  public modalTitle: string = 'Default Title';

  constructor(public activeModal: NgbActiveModal) {

  }
}

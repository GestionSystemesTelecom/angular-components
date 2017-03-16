import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <gst-modal id="ASecondExpliciteId" [title]="'Second Modal'">
      <h1>A second component inside a second Modal</h1>
      <button (click)="activeModal.close('Action closed modal')">Close</button>
    </gst-modal>
  `
})
export class SecondModalComponent {
    public modalTitle: string = 'Default Title';

    constructor(public activeModal: NgbActiveModal) {

    }
}

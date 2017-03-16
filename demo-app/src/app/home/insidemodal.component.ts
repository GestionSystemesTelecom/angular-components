import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GSTModal } from '../../../../components/modal';
import { SecondModalComponent } from './secondmodal.component';

@Component({
  template: `
    <gst-modal id="AnExpliciteId" [title]="modalTitle">
      <h1>A component inside a Modal</h1>
      <button (click)="OpenSecondModal()">Second Modal</button>
      <button (click)="activeModal.close('Action closed modal')">Close</button>
    </gst-modal>
  `
})
export class InsideModalComponent {
    public modalTitle: string = 'Default Title';

    constructor(public activeModal: NgbActiveModal, private gstModal: GSTModal) {

    }

    public OpenSecondModal() {
        const modalRef = this.gstModal.open(SecondModalComponent);

        modalRef.result
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log('dismiss');
             });
    }
}

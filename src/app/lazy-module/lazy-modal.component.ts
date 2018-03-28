import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <gst-modal id="lazy-modal-component" i18n-title [title]="'Lazy Modal'">
        <h1>Lazy Modal Component</h1>
        <button (click)="onClose()">Close</button>
    </gst-modal>
  `
})
export class LazyModalComponent {

    public aProperty = 'a';

    constructor(public activeModal: NgbActiveModal) { }

    public onClose() {
        this.activeModal.close(`aProperty : ${this.aProperty}`);
    }

}

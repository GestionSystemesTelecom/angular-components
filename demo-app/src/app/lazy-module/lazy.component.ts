import { Component } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GSTModal } from '../../../../components/modal';
import { LazyModalComponent } from './lazy-modal.component';

@Component({
    selector: 'gestion-utilisateur',
    template: `
        <h1>Lazy Module</h1>
        <button (click)="onOpen()">Open this wonderfull Modal !</button>
    `
})
export class LazyComponent {

    constructor(private gstModal: GSTModal) { }

    public onOpen() {
        let modalRef = this.gstModal.open(LazyModalComponent);
        modalRef.componentInstance.aProperty = 'changed';
        modalRef.result
            .then((res) => {
                console.log(res);
            })
            .catch(() => {
                console.log('dismiss');
            });
    }

}

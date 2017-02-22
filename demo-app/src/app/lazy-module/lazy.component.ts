import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LazyModalComponent } from './lazy-modal.component';

@Component({
    selector: 'gestion-utilisateur',
    template: `
        <h1>Lazy Module</h1>
        <button (click)="onOpen()">Open this wonderfull Modal !</button>
    `
})
export class LazyComponent {

    constructor(private ngbModal: NgbModal) { }

    public onOpen() {
        let modalRef = this.ngbModal.open(LazyModalComponent, { keyboard: false, backdrop: false });
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

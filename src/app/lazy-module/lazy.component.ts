import { Component } from '@angular/core';
import { LazyModalComponent } from './lazy-modal.component';
import { GSTModal } from '../modules';

@Component({
    selector: 'app-gestion-utilisateur',
    template: `
        <h1>Lazy Module</h1>
        <button (click)="onOpen()">Open this wonderfull Modal !</button>
    `
})
export class LazyComponent {

    constructor(private gstModal: GSTModal) { }

    public onOpen() {
        const modalRef = this.gstModal.open(LazyModalComponent);
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

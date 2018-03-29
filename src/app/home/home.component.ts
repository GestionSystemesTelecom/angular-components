import { Component } from '@angular/core';
import { InsideModalComponent } from './insidemodal.component';
import { BusyService, GSTModal } from 'gst-components';


@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'app-home',  // <home></home>
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(
        private gstModal: GSTModal,
        private busyService: BusyService
    ) {}

    public openModal() {
        const modalRef = this.gstModal.open(InsideModalComponent, {size: 'lg'});
        modalRef.componentInstance.modalTitle = 'A title';

        modalRef.result
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log('dismiss');
             });
    }

    public loadingBusy() {
        this.busyService.show();
        setTimeout(() => this.busyService.hide(), 2000);
    }

    public loadingBusyStrob() {
        this.busyService.show();
        this.busyService.hide();
        setTimeout(() => {
            console.log('load 100');
            this.busyService.show();
        }, 10);

        setTimeout(() => {
            console.log('stop 150');
            this.busyService.hide();
        }, 15);

        setTimeout(() => {
            console.log('load 200');
            this.busyService.show();
        }, 20);

        setTimeout(() => {
            console.log('stop 250');
            this.busyService.hide();
        }, 25);

        setTimeout(() => {
            console.log('load 300');
            this.busyService.show();
        }, 30);

        setTimeout(() => {
            console.log('stop 350');
            this.busyService.hide();
        }, 35);

        setTimeout(() => {
            console.log('load 400');
            this.busyService.show();
        }, 40);

        setTimeout(() => {
            console.log('stop 450');
            this.busyService.hide();
        }, 45);
    }

    public submitState(value: string) {
        console.log('submitState', value);
    }
}

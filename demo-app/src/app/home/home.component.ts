import { Component } from '@angular/core';
import { GSTModal } from '../../../../components/modal';
import { InsideModalComponent } from './insidemodal.component';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',  // <home></home>
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private gstModal: GSTModal) {}

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

    public submitState(value: string) {
        console.log('submitState', value);
    }
}

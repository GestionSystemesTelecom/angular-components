import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  // TypeScript public modifiers
  constructor(private ngbModal: NgbModal) {}

  public openModal() {
        const modalRef = this.ngbModal.open(InsideModalComponent, { keyboard: false, backdrop: false });
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

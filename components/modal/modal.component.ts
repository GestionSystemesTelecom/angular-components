import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import '../shared/drag';

declare var $: any;

@Component({
    selector: 'gst-modal',
    template: `
        <div class="modal-outer modal-draggable">
            <div class="modal-header">
                <h4 class="modal-title">{{Titre}}</h4>
                <div class="modal-action-bar">
                    <button *ngIf="CloseButton" type="button" class="close" aria-label="Close" (click)="InnerModaleActiveModal.dismiss('Cross click')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class ModalComponent implements OnInit {

    @Input() public Titre: string = 'Titre de la modale';
    @Input() public CloseButton: boolean = true;

    // Documentation: https://ng-bootstrap.github.io/#/components/modal
    constructor(public InnerModaleActiveModal: NgbActiveModal) {
    }

    public ngOnInit() {
        $('.modal-draggable').drag({
            handle: '.modal-header'
        });

        $('.modal-outer-template-div').bind('DOMSubtreeModified', function (this) {
            if ($('.modal-outer-template-div').find('.modal').length > 0) {
                $('body').addClass('my-modal-open');
            }
            else {
                $('body').removeClass('my-modal-open');
            }
        });
    }
}

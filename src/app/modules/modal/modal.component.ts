import { Component, Input, OnInit, ViewEncapsulation, Renderer2, Inject, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'gst-modal',
    styleUrls: ['./modal.css'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div ngDraggable [bounds]="_document.body" [inBounds]="true" [handle]="myHandle" class="modal-outer modal-draggable onselect">
            <div #myHandle class="modal-header">
                <h4 class="modal-title">{{title}}</h4>
                <div class="modal-action-bar">
                    <button *ngIf="closeButton" type="button" class="close" aria-label="Close" (click)="innerModaleActiveModal.dismiss()">
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
export class ModalComponent implements OnInit, OnDestroy {

    @Input() public title = 'Modal title';
    @Input() public closeButton = true;
    private _document: any;

    // Documentation: https://ng-bootstrap.github.io/#/components/modal
    constructor(
        @Inject(DOCUMENT) document,
        public innerModaleActiveModal: NgbActiveModal,
        public renderer: Renderer2
    ) {
        this._document = document;
    }

    public ngOnInit() {
        this.renderer.addClass(this._document.body, 'gst-modal-open');
        this.renderer.addClass(this._document.body, 'noselect');
    }

    public ngOnDestroy(): void {
        if (this._document.querySelector('.modal') == null) {
            this.renderer.removeClass(this._document.body, 'gst-modal-open');
            this.renderer.removeClass(this._document.body, 'noselect');
        }
    }
}

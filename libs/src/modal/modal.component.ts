import { Component, Input, OnInit, ViewEncapsulation, Renderer2, Inject, OnDestroy, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'gst-modal',
    styleUrls: ['./modal.css'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div id="{{elRef.nativeElement.id}}_Modal" ngDraggable [handle]="myHandle" class="modal-outer modal-draggable onselect" (movingOffset)="onMoveEnd($event)">
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
        public renderer: Renderer2,
        public elRef: ElementRef
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

    public onMoveEnd($event) {
        let maxWidth = Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        );
        let element = document.getElementById(this.elRef.nativeElement.id + '_Modal');
        let x = element.offsetLeft + $event.x;
        let y = element.offsetTop + $event.y;

        let eventX = $event.x < -element.offsetLeft ? -element.offsetLeft : $event.x;
        let eventY = $event.y < -element.offsetTop ? -element.offsetTop : $event.y;

        if (y < 0) {
            element.style.transform = 'translate(' + eventX + 'px, -' + element.offsetTop + 'px)';
        }

        if (x < 0) {
            element.style.transform = 'translate(-' + element.offsetLeft + 'px, ' + eventY + 'px)';
        }

        if (x + element.offsetWidth > maxWidth) {

            element.style.transform = 'translate(' + (maxWidth - element.offsetWidth - element.offsetLeft) + 'px, ' + eventY + 'px)';
        }
    }
}

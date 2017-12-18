import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import '../shared/drag';

declare var $: any;

@Component({
    selector: 'gst-modal',
    styles: ["body.gst-modal-open, body.modal-open { overflow: hidden; } @keyframes fadein { 0% { opacity: 0; } 100% { opacity: 1; } } @-webkit-keyframes fadein { 0% { opacity: 0; } 100% { opacity: 1; } } .modal-backdrop { background: rgba(0, 0, 0, 0.4); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 200; opacity: 0; } ngb-modal-window { position: fixed; z-index: 200; top: 0; left: 0; width: 100vw; height: 100vh; } .modal .modal-content { position: fixed; z-index: 201; overflow: auto; background: rgba(0, 0, 0, 0.4); width: 100vw; height: 100vh; opacity: 0; -webkit-animation: .5s ease 0s normal forwards 1 fadein; animation: .5s ease 0s normal forwards 1 fadein; } .modal .modal-outer { width: 50%; left: 25%; position: relative; z-index: 201; top: 60px; background: #fff; border-radius: 2px; margin-bottom: 60px; } .modal-header { position: relative; box-sizing: border-box; -moz-box-sizing: border-box; cursor: move; background-color: whitesmoke; height: 40px; } .modal-header:before { content: ''; position: absolute; width: calc(100% - 30px); border-top-width: 1px; border-top-style: solid; border-top-color: #d9dde5; left: 15px; top: 21px; } .modal-header h4 { margin: 0; } .modal-header .modal-title { position: relative; display: inline-block; left: 30px; background-color: whitesmoke; color: #48a770; font-weight: 300; padding: 0 20px; } .modal-header .modal-action-bar { position: absolute; right: 25px; top: 5px; height: 100%; } .modal-header .modal-action-bar button.close { cursor: pointer; border: 0; width: 30px; height: 30px; line-height: 30px; background: whitesmoke; font-size: 1.5em; } .modal-header .modal-action-bar button.close:hover { color: #fff; background: #e88b81; } .modal-body { position: relative; z-index: 1; background: #fff; } .modal-lg .modal-outer { width: 70%; left: 15%; } .modal-sm .modal-outer { width: 40%; left: 30%; } .modal-title { line-height: 40px; font-size: 18px; font-weight: 300; max-width: 91%; display: inline-block; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; color: #444; } @media only screen and (max-width: 1440px) { .modal .modal-outer { width: 75%; left: 12.5%; } .modal-lg .modal-outer { width: 90%; left: 5%; } .modal-sm .modal-outer { width: 60%; left: 20%; } } @media only screen and (max-device-width: 480px), (max-width: 911px) { .modal .modal-outer { width: 100%; left: 0; top: 0; margin-bottom: 0; height: 100vh; } .modal-header { position: fixed; top: 0; width: 100%; z-index: 100; } .modal-body { height: calc(100vh - 40px); top: 40px; overflow: auto; } .modal-lg .modal-outer { width: 100%; left: 0; top: 0; } .modal-sm .modal-outer { width: 100%; left: 0; top: 0; } } "],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="modal-outer modal-draggable">
            <div class="modal-header">
                <h4 class="modal-title">{{title}}</h4>
                <div class="modal-action-bar">
                    <button *ngIf="closeButton" type="button" class="close" aria-label="Close" (click)="InnerModaleActiveModal.dismiss()">
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

    @Input() public title: string = 'Modal title';
    @Input() public closeButton: boolean = true;

    // Documentation: https://ng-bootstrap.github.io/#/components/modal
    constructor(public InnerModaleActiveModal: NgbActiveModal) {
    }

    public ngOnInit() {
        $('.modal-draggable').drag({
            handle: '.modal-header'
        });

        $('.modal-outer-template-div').bind('DOMSubtreeModified', () => {
            if ($('.modal-outer-template-div').find('.modal').length > 0) {
                $('body').addClass('gst-modal-open');
            } else {
                $('body').removeClass('gst-modal-open');
            }
        });
    }
}

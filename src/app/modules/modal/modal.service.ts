import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Injectable()
export class GSTModal {
    constructor(public modalService: NgbModal) { }

    public open(content: any, options?: NgbModalOptions): NgbModalRef {
        options = $.extend({
            backdrop: false,
            container: '.modal-outer-template-div',
            keyboard: false,
            size: '',
            windowClass: ''
        }, options);

        return this.modalService.open(content, options);
    }
}

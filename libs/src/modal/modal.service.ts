import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { extend } from '../shared/extend';

@Injectable()
export class GSTModal {
    constructor(public modalService: NgbModal) { }

    public open(content: any, options?: NgbModalOptions): NgbModalRef {
        let def = {
            backdrop: false,
            container: '.modal-outer-template-div',
            keyboard: false,
            size: '',
            windowClass: ''
        };
        options = extend({}, def, options);

        return this.modalService.open(content, options);
    }
}

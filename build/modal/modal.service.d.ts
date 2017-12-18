import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
export declare class GSTModal {
    modalService: NgbModal;
    constructor(modalService: NgbModal);
    open(content: any, options?: NgbModalOptions): NgbModalRef;
}

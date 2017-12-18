import { OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import '../shared/drag';
export declare class ModalComponent implements OnInit {
    InnerModaleActiveModal: NgbActiveModal;
    title: string;
    closeButton: boolean;
    constructor(InnerModaleActiveModal: NgbActiveModal);
    ngOnInit(): void;
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

import * as $ from 'jquery';

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    providers: [], // leave empty to avoid multiple instances
    declarations: [ModalComponent],
    exports: [ModalComponent]
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [NgbModule]
        };
    }
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
import { GSTModal } from './modal.service';

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
            providers: [NgbModule, GSTModal]
        };
    }
}
